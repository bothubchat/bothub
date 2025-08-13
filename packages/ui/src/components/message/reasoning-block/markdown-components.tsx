import ReactMarkdown from 'react-markdown';
import {
  MessageBold,
  MessageImageProps,
  MessageItalic,
  MessageLink,
  MessageMultilineCodeProps,
  MessageParagraph,
} from '@/ui/components/message/components';

export function markdownComponents(): Partial<
  React.ComponentProps<typeof ReactMarkdown>['components']
> & {
  code?: Partial<MessageMultilineCodeProps>;
  image?: Omit<Partial<MessageImageProps>, 'buttons'> & {
    buttons?: (imageProps: MessageImageProps) => React.ReactNode;
  };
} {
  return {
    p: ({ children }) => (
      <MessageParagraph
        wrap
        variant="body-m-regular"
      >
        {children}
      </MessageParagraph>
    ),
    b: ({ children }) => (
      <MessageBold variant="body-m-regular">{children}</MessageBold>
    ),
    strong: ({ children }) => (
      <MessageBold
        component="strong"
        variant="body-m-regular"
      >
        {children}
      </MessageBold>
    ),
    i: ({ children }) => (
      <MessageItalic variant="body-m-regular">{children}</MessageItalic>
    ),
    em: ({ children }) => (
      <MessageItalic
        component="em"
        variant="body-m-regular"
      >
        {children}
      </MessageItalic>
    ),
    a: ({ href, children }) => (
      <MessageLink
        href={href}
        target="_blank"
        variant="body-m-regular"
      >
        {children}
      </MessageLink>
    ),
  };
}
