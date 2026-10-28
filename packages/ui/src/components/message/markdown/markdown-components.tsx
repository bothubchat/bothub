import React, { createContext, memo, useContext, useMemo } from 'react';
import { type Components } from 'react-markdown';
import {
  GeneratedDocumentBlock,
  MessageCite,
  MessageComponentsProps,
  MessageImage,
  MessageImageProps,
  MessageInlineCode,
  MessageMultilineCode,
} from '@/ui/components/message/components';
import { MessageCodeTypingContext } from '@/ui/components/message/components/code/multiline/content/typing';
import { useMessage } from '@/ui/components/message/context';
import { useMarkdownPlugins } from './useMarkdownPlugins';
import { normalizeMessageMarkdown } from './utils';
import { MATH_TAG_NAME, getLoadedMath } from './math-loader';
import type { MarkdownMathProps } from './math';
import { markdownClassNames } from './class-names';

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

// Math elements come only from the plugins of the loaded formula chunk.
const MarkdownMathElement = (props: MarkdownMathProps) => {
  const math = getLoadedMath();
  return math ? <math.MarkdownMath {...props} /> : props['data-tex'];
};

// `Components` only knows intrinsic elements, the math element is custom.
const mathComponents = {
  [MATH_TAG_NAME]: MarkdownMathElement,
} as Components;

const md = markdownClassNames;

const getListItemClassName = (className?: string) =>
  className ? `${md.listItem} ${className}` : md.listItem;

// GFM puts the start of an ordered list in `start`, the counter follows it.
const getListStyle = (start?: number): React.CSSProperties | undefined =>
  start ? { counterSet: `item ${start - 1}` } : undefined;

/*
 * Plain tags with the classes styled by the markdown container: no styled
 * component, Typography or context subscription per element. The markup is
 * the same as the Message* components rendered, without their generated
 * classes.
 */
export const baseMarkdownComponents: Components = {
  ...mathComponents,
  p: ({ children }) => <p className={md.paragraph}>{children}</p>,
  b: ({ children }) => <b className={md.bold}>{children}</b>,
  strong: ({ children }) => <strong className={md.bold}>{children}</strong>,
  i: ({ children }) => <i className={md.italic}>{children}</i>,
  em: ({ children }) => <em className={md.italic}>{children}</em>,
  del: ({ children }) => <del className={md.strike}>{children}</del>,
  blockquote: ({ children }) => (
    <blockquote className={md.blockquote}>{children}</blockquote>
  ),
  cite: ({ children }) => <MessageCite>{children}</MessageCite>,
  hr: () => <hr className={md.hr} />,
  pre: ({ children }) => <pre className={md.pre}>{children}</pre>,
  table: ({ children }) => (
    <div className={md.table}>
      <table className={md.tableContent}>{children}</table>
    </div>
  ),
  td: ({ style, children }) => (
    <td
      className={md.tableCell}
      style={style}
    >
      <span className={md.tableCellText}>{children}</span>
    </td>
  ),
  th: ({ style, children }) => (
    <th
      className={md.tableCell}
      style={style}
    >
      <span className={md.tableCellText}>{children}</span>
    </th>
  ),
  ul: ({ children }) => <ul className={md.list}>{children}</ul>,
  ol: ({ start, children }) => (
    <ol
      className={md.list}
      start={start}
      style={getListStyle(start)}
    >
      {children}
    </ol>
  ),
  li: ({ id, className, children }) => (
    <li
      id={id}
      className={getListItemClassName(className)}
    >
      {children}
    </li>
  ),
  h1: ({ children }) => <h1 className={md.title}>{children}</h1>,
  // GFM footnotes add a visually hidden English "Footnotes" heading.
  h2: ({ className, children }) =>
    className?.includes('sr-only') ? null : (
      <h2 className={md.title}>{children}</h2>
    ),
  h3: ({ children }) => <h3 className={md.title}>{children}</h3>,
  h4: ({ children }) => <h4 className={md.title}>{children}</h4>,
  h5: ({ children }) => <h5 className={md.title}>{children}</h5>,
  h6: ({ children }) => <h6 className={md.title}>{children}</h6>,
  a: ({ id, href, children }) => (
    <a
      id={id}
      href={href}
      className={md.link}
      {...markdownLinkTargetProps(href)}
    >
      {children}
    </a>
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
    const normalizedCode = useMemo(
      () => normalizeMessageMarkdown(code, { typing }),
      [code, typing],
    );
    const { remarkPlugins, rehypePlugins } = useMarkdownPlugins(normalizedCode);

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
