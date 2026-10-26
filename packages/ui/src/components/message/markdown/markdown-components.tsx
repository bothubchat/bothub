import React, { createContext, memo, useContext, useMemo } from 'react';
import { type Components } from 'react-markdown';
import {
  GeneratedDocumentBlock,
  MessageBlockquote,
  MessageBold,
  MessageCite,
  MessageComponentsProps,
  MessageHr,
  MessageImage,
  MessageImageProps,
  MessageInlineCode,
  MessageItalic,
  MessageLink,
  MessageList,
  MessageListItem,
  MessageMultilineCode,
  MessageParagraph,
  MessagePre,
  MessageStrike,
  MessageTable,
  MessageTableBody,
  MessageTableCell,
  MessageTableHead,
  MessageTableRow,
  MessageTitle,
} from '@/ui/components/message/components';
import { MessageCodeTypingContext } from '@/ui/components/message/components/code/multiline/content/typing';
import { useMessage } from '@/ui/components/message/context';
import { useMarkdownPlugins } from './useMarkdownPlugins';
import { normalizeMessageMarkdown } from './utils';
import { MATH_TAG_NAME, MarkdownMath } from './math';

/*
 * Components passed to react-markdown must keep a stable identity: a new
 * function on every render makes React remount the whole markdown tree on each
 * streamed chunk (code highlighting restarts, images reload, selection is lost).
 * Values that depend on props are read from context instead of closures.
 */
const MessageMarkdownComponentsContext = createContext<MessageComponentsProps>(
  {},
);

export const MessageMarkdownComponentsProvider =
  MessageMarkdownComponentsContext.Provider;

/**
 * Start of the line that opens the code block a streamed markdown block ends
 * in, `null` if there is no such code. Only that code changes on every chunk:
 * it is shown as plain text and highlighted once it is complete.
 */
const MessageMarkdownOpenCodeContext = createContext<number | null>(null);

export const MessageMarkdownOpenCodeProvider =
  MessageMarkdownOpenCodeContext.Provider;

export interface MarkdownCodeInfo {
  code: string;
  language: string;
  isInline: boolean;
}

export const getMarkdownCodeInfo = (
  className: string | undefined,
  children: React.ReactNode,
): MarkdownCodeInfo => {
  const rawCode = String(children ?? '');
  const match = /language-(\w+)/.exec(className || '');

  return {
    code: rawCode.replace(/\n$/, ''),
    language: match ? match[1] : '',
    // react-markdown v10 has no `inline` prop: fenced blocks always end with a
    // newline or carry a language class, inline code never does.
    isInline: !className?.startsWith('language-') && !rawCode.endsWith('\n'),
  };
};

const isAnchorLink = (href?: string) => !!href && href.startsWith('#');

export const markdownLinkTargetProps = (href?: string) =>
  isAnchorLink(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' };

const MarkdownImage: Components['img'] = ({ src, alt }) => {
  const components = useContext(MessageMarkdownComponentsContext);

  if (!src || typeof src !== 'string') return null;

  const imageProps: MessageImageProps = {
    ...components.image,
    src,
    alt,
    disableSkeleton: true,
    buttons: null,
  };

  return (
    <MessageImage
      {...imageProps}
      {...(components.image?.buttons && {
        buttons: components.image.buttons(imageProps),
      })}
    />
  );
};

// `Components` only knows intrinsic elements, the math element is custom.
const mathComponents = {
  [MATH_TAG_NAME]: MarkdownMath,
} as Components;

export const baseMarkdownComponents: Components = {
  ...mathComponents,
  p: ({ children }) => <MessageParagraph wrap>{children}</MessageParagraph>,
  b: ({ children }) => <MessageBold>{children}</MessageBold>,
  strong: ({ children }) => (
    <MessageBold component="strong">{children}</MessageBold>
  ),
  i: ({ children }) => <MessageItalic>{children}</MessageItalic>,
  em: ({ children }) => (
    <MessageItalic component="em">{children}</MessageItalic>
  ),
  del: ({ children }) => <MessageStrike>{children}</MessageStrike>,
  blockquote: ({ children }) => (
    <MessageBlockquote>{children}</MessageBlockquote>
  ),
  cite: ({ children }) => <MessageCite>{children}</MessageCite>,
  hr: () => <MessageHr />,
  pre: ({ children }) => <MessagePre>{children}</MessagePre>,
  table: ({ children }) => <MessageTable>{children}</MessageTable>,
  thead: ({ children }) => <MessageTableHead>{children}</MessageTableHead>,
  tbody: ({ children }) => <MessageTableBody>{children}</MessageTableBody>,
  tr: ({ children }) => <MessageTableRow>{children}</MessageTableRow>,
  td: ({ style, children }) => (
    <MessageTableCell style={style}>{children}</MessageTableCell>
  ),
  th: ({ style, children }) => (
    <MessageTableCell
      head
      style={style}
    >
      {children}
    </MessageTableCell>
  ),
  ul: ({ children }) => <MessageList>{children}</MessageList>,
  ol: ({ start, children }) => (
    <MessageList
      variant="number"
      start={start}
    >
      {children}
    </MessageList>
  ),
  li: ({ id, className, children }) => (
    <MessageListItem
      id={id}
      className={className}
    >
      {children}
    </MessageListItem>
  ),
  h1: ({ children }) => <MessageTitle variant="h1">{children}</MessageTitle>,
  // GFM footnotes add a visually hidden English "Footnotes" heading.
  h2: ({ className, children }) =>
    className?.includes('sr-only') ? null : (
      <MessageTitle variant="h2">{children}</MessageTitle>
    ),
  h3: ({ children }) => <MessageTitle variant="h3">{children}</MessageTitle>,
  h4: ({ children }) => <MessageTitle variant="h4">{children}</MessageTitle>,
  h5: ({ children }) => <MessageTitle variant="h5">{children}</MessageTitle>,
  h6: ({ children }) => <MessageTitle variant="h6">{children}</MessageTitle>,
  a: ({ id, href, children }) => (
    <MessageLink
      id={id}
      href={href}
      {...markdownLinkTargetProps(href)}
    >
      {children}
    </MessageLink>
  ),
  img: MarkdownImage,
};

interface MarkdownDocumentProps {
  code: string;
  isTg: boolean;
  copyLabel?: string;
}

// A document block has its own markdown: it is parsed again only when its
// code changes, not on every chunk streamed after it.
const MarkdownDocument = memo(
  ({ code, isTg, copyLabel }: MarkdownDocumentProps) => {
    const { typing } = useMessage();
    const { remarkPlugins, rehypePlugins } = useMarkdownPlugins();
    const normalizedCode = useMemo(
      () => normalizeMessageMarkdown(code, { typing }),
      [code, typing],
    );

    return (
      <GeneratedDocumentBlock
        code={normalizedCode}
        copyLabel={copyLabel}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        baseComponents={baseMarkdownComponents}
        isTg={isTg}
      />
    );
  },
);

const MarkdownCode: Components['code'] = ({ node, className, children }) => {
  const components = useContext(MessageMarkdownComponentsContext);
  const openCodeStart = useContext(MessageMarkdownOpenCodeContext);
  const { code, language, isInline } = getMarkdownCodeInfo(className, children);

  if (!code) return null;

  const isDoc = language === 'doc' || language === 'result';
  const isTg = language === 'tg';

  if (isDoc || isTg) {
    return (
      <MarkdownDocument
        code={code}
        isTg={isTg}
        copyLabel={components.document?.copyLabel}
      />
    );
  }

  if (isInline) {
    return <MessageInlineCode>{code}</MessageInlineCode>;
  }

  // Code that starts before the open fence is complete.
  const start = node?.position?.start.offset;
  const isTyped =
    openCodeStart !== null && (start === undefined || start >= openCodeStart);

  return (
    <MessageCodeTypingContext.Provider value={isTyped}>
      <MessageMultilineCode
        {...components.code}
        className={className}
      >
        {code}
      </MessageMultilineCode>
    </MessageCodeTypingContext.Provider>
  );
};

export const messageMarkdownComponents: Components = {
  ...baseMarkdownComponents,
  code: MarkdownCode,
};
