import type { Components } from 'react-markdown';

import {
  MessageBold,
  MessageItalic,
  MessageLink,
  MessageParagraph,
  MessageTitle,
} from '@/ui/components/message/components';

const VARIANT = 'body-s-regular';

export const reasoningComponentsOverride: Partial<Components> = {
  p: ({ children }) => (
    <MessageParagraph
      wrap
      variant={VARIANT}
    >
      {children}
    </MessageParagraph>
  ),
  b: ({ children }) => <MessageBold variant={VARIANT}>{children}</MessageBold>,
  strong: ({ children }) => (
    <MessageBold
      component="strong"
      variant={VARIANT}
    >
      {children}
    </MessageBold>
  ),
  i: ({ children }) => (
    <MessageItalic variant={VARIANT}>{children}</MessageItalic>
  ),
  em: ({ children }) => (
    <MessageItalic
      component="em"
      variant={VARIANT}
    >
      {children}
    </MessageItalic>
  ),
  a: ({ href, children }) => (
    <MessageLink
      href={href}
      target="_blank"
      variant={VARIANT}
    >
      {children}
    </MessageLink>
  ),
  h1: ({ children }) => <MessageTitle variant="h3">{children}</MessageTitle>,
  h2: ({ children }) => <MessageTitle variant="h4">{children}</MessageTitle>,
  h3: ({ children }) => <MessageTitle variant="h5">{children}</MessageTitle>,
};
