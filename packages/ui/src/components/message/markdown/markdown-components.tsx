import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  GeneratedDocumentBlock,
  MessageBold,
  MessageComponentsProps,
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
  MessageTable,
  MessageTableBody,
  MessageTableCell,
  MessageTableHead,
  MessageTableRow,
  MessageTitle,
} from '@/ui/components/message/components';

export function markdownComponents(
  components: MessageComponentsProps,
  componentsOverride?: React.ComponentProps<typeof ReactMarkdown>['components'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  remarkPlugins?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rehypePlugins?: any,
): React.ComponentProps<typeof ReactMarkdown>['components'] {
  const baseComponents: React.ComponentProps<
    typeof ReactMarkdown
  >['components'] = {
    p: ({ children }) => <MessageParagraph wrap>{children}</MessageParagraph>,
    b: ({ children }) => <MessageBold>{children}</MessageBold>,
    strong: ({ children }) => (
      <MessageBold component="strong">{children}</MessageBold>
    ),
    i: ({ children }) => <MessageItalic>{children}</MessageItalic>,
    em: ({ children }) => (
      <MessageItalic component="em">{children}</MessageItalic>
    ),
    pre: ({ children }) => <MessagePre>{children}</MessagePre>,
    table: ({ children }) => <MessageTable>{children}</MessageTable>,
    thead: ({ children }) => <MessageTableHead>{children}</MessageTableHead>,
    tbody: ({ children }) => <MessageTableBody>{children}</MessageTableBody>,
    tr: ({ children }) => <MessageTableRow>{children}</MessageTableRow>,
    td: ({ children }) => <MessageTableCell>{children}</MessageTableCell>,
    th: ({ children }) => <MessageTableCell head>{children}</MessageTableCell>,
    ul: ({ children }) => <MessageList>{children}</MessageList>,
    ol: ({ start, children }) => (
      <MessageList
        variant="number"
        start={start}
      >
        {children}
      </MessageList>
    ),
    li: ({ children }) => <MessageListItem>{children}</MessageListItem>,
    h1: ({ children }) => <MessageTitle variant="h1">{children}</MessageTitle>,
    h2: ({ children }) => <MessageTitle variant="h2">{children}</MessageTitle>,
    h3: ({ children }) => <MessageTitle variant="h3">{children}</MessageTitle>,
    h4: ({ children }) => <MessageTitle variant="h4">{children}</MessageTitle>,
    h5: ({ children }) => <MessageTitle variant="h5">{children}</MessageTitle>,
    h6: ({ children }) => <MessageTitle variant="h6">{children}</MessageTitle>,
    a: ({ href, children }) => (
      <MessageLink
        href={href}
        target="_blank"
      >
        {children}
      </MessageLink>
    ),
    img: ({ src, alt }) => {
      if (!src) return null;
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
          {...(components.image &&
            components.image.buttons && {
              buttons: components.image.buttons(imageProps),
            })}
        />
      );
    },
  };

  return {
    ...baseComponents,
    code: ({ className, children }) => {
      const code = String(children).replace(/\n$/, '');
      if (!code) return null;

      const isInline = !className || !className.startsWith('language-');
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';

      const isDoc = language === 'doc' || language === 'result';
      const isTg = language === 'tg';

      if (isDoc || isTg) {
        return (
          <GeneratedDocumentBlock
            code={code}
            copyLabel={components.document?.copyLabel}
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
            baseComponents={baseComponents}
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
    },
    ...componentsOverride,
  };
}
