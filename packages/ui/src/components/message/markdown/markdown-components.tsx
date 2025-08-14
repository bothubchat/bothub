import ReactMarkdown from 'react-markdown';
import {
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
): React.ComponentProps<typeof ReactMarkdown>['components'] {
  return {
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
    code: ({ className, children }) => {
      const code = String(children);
      if (!code) {
        return null;
      }

      const isInline = !className || !className.startsWith('language-');

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
      if (!src) {
        return null;
      }

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
    ...componentsOverride,
  };
}
