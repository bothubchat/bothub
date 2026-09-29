import React, { createContext, useContext } from 'react';
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
import { useMessage } from '@/ui/components/message/context';
import { useMarkdownPlugins } from './useMarkdownPlugins';
import { normalizeMessageMarkdown } from './utils';

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

export const baseMarkdownComponents: Components = {
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

const MarkdownCode: Components['code'] = ({ className, children }) => {
  const components = useContext(MessageMarkdownComponentsContext);
  const { typing } = useMessage();
  const { remarkPlugins, rehypePlugins } = useMarkdownPlugins();
  const { code, language, isInline } = getMarkdownCodeInfo(className, children);

  if (!code) return null;

  const isDoc = language === 'doc' || language === 'result';
  const isTg = language === 'tg';

  if (isDoc || isTg) {
    return (
      <GeneratedDocumentBlock
        code={normalizeMessageMarkdown(code, { typing })}
        copyLabel={components.document?.copyLabel}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        baseComponents={baseMarkdownComponents}
        isTg={isTg}
      />
    );
  }

  if (isInline) {
    return <MessageInlineCode>{code}</MessageInlineCode>;
  }

  return (
    <MessageMultilineCode
      {...components.code}
      className={className}
    >
      {code}
    </MessageMultilineCode>
  );
};

export const messageMarkdownComponents: Components = {
  ...baseMarkdownComponents,
  code: MarkdownCode,
};
