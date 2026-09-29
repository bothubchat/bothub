import type { Components } from 'react-markdown';

import {
  MessageBold,
  MessageInlineCode,
  MessageItalic,
  MessageLink,
  MessageMultilineCode,
  MessageParagraph,
  MessagePre,
  MessageTitle,
} from '@/ui/components/message/components';
import {
  getMarkdownCodeInfo,
  markdownLinkTargetProps,
} from '../markdown/markdown-components';

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
  pre: ({ children }) => <MessagePre>{children}</MessagePre>,
  code: ({ className, children }) => {
    const { code, isInline } = getMarkdownCodeInfo(className, children);
    if (!code) {
      return null;
    }

    if (isInline) {
      return <MessageInlineCode>{code}</MessageInlineCode>;
    }

    return (
      <MessageMultilineCode className={className}>{code}</MessageMultilineCode>
    );
  },
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
  a: ({ id, href, children }) => (
    <MessageLink
      id={id}
      href={href}
      {...markdownLinkTargetProps(href)}
      variant={VARIANT}
    >
      {children}
    </MessageLink>
  ),
  h1: ({ children }) => <MessageTitle variant="h3">{children}</MessageTitle>,
  h2: ({ children }) => <MessageTitle variant="h4">{children}</MessageTitle>,
  h3: ({ children }) => <MessageTitle variant="h5">{children}</MessageTitle>,
};
