import { lazy, Suspense } from 'react';
import { MessageMultilineCodeContentProps } from './types';
import {
  MessageMultilineCodeContentContainer,
  MessageMultilineCodeContentStyled,
  MessageMultilineCodeLastLine
} from './styled';

const MessageMultilineCodeContentHighlighted = lazy(() =>
  import('./highlighted').then((module) => ({
    default: module.MessageMultilineCodeContentHighlighted
  }))
);

export const MessageMultilineCodeContent = ({
  children,
  $messageColor,
  className
}: MessageMultilineCodeContentProps) => {
  const message = children?.toString().split('\n') ?? [];
  return (
    <MessageMultilineCodeContentContainer>
      <Suspense
        fallback={
          <MessageMultilineCodeContentStyled
            $messageColor={$messageColor}
            className={className}
          >
            {message.slice(0, -2).join('\n')}
            <MessageMultilineCodeLastLine>
              {message.slice(-2)}
            </MessageMultilineCodeLastLine>
          </MessageMultilineCodeContentStyled>
        }
      >
        <MessageMultilineCodeContentHighlighted
          $messageColor={$messageColor}
          className={className}
        >
          {message.slice(0, -1).join('\n')}
          <MessageMultilineCodeLastLine>
            {message.slice(-1)}
          </MessageMultilineCodeLastLine>
        </MessageMultilineCodeContentHighlighted>
      </Suspense>
    </MessageMultilineCodeContentContainer>
  );
};
