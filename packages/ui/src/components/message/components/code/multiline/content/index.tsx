import { lazy, Suspense } from 'react';
import { MessageMultilineCodeContentProps } from './types';
import { MessageMultilineCodeContentStyled } from './styled';

const MessageMultilineCodeContentHighlighted = lazy(() => import('./highlighted')
  .then((module) => ({
    default: module.MessageMultilineCodeContentHighlighted,
  })));

export const MessageMultilineCodeContent = ({
  children,
  $messageColor,
  className,
}: MessageMultilineCodeContentProps) => (
  <Suspense
    fallback={(
      <MessageMultilineCodeContentStyled
        $messageColor={$messageColor}
        className={className}
      >
        {children}
      </MessageMultilineCodeContentStyled>
    )}
  >
    <MessageMultilineCodeContentHighlighted
      $messageColor={$messageColor}
      className={className}
    >
      {children}
    </MessageMultilineCodeContentHighlighted>
  </Suspense>
);
