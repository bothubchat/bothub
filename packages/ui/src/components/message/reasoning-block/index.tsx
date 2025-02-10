import { ReactNode, useCallback, useState } from 'react';
import { useMeasure } from 'react-use';
import { useDelayedVisible } from '@/ui/utils';
import { LoaderCircularGradient2Icon } from '@/ui/icons';
import { MessageMarkdown } from '../markdown';
import {
  ReasoningBlockButton,
  ReasoningBlockButtonArrow,
  ReasoningBlockContentWrapper,
  ReasoningBlockHeader
} from './styled';
import { markdownComponents } from './markdown-components';

export type ReasoningBlockProps = {
  content?: string | ReactNode;
  buttonText: ReactNode;
  isReasoning?: boolean;
};

export const MessageReasoningBlock = ({
  content,
  buttonText,
  isReasoning
}: ReasoningBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    if (isReasoning) {
      return;
    }

    setIsOpen((prev) => !prev);
  }, [isReasoning]);

  const [ref, bounds] = useMeasure<HTMLDivElement>();
  const animationDuration = Math.max(Math.min(bounds.height, 850), 300);
  const { delayedVisible, mounted } = useDelayedVisible(
    isOpen,
    0,
    animationDuration
  );

  return (
    <div>
      <ReasoningBlockHeader>
        <ReasoningBlockButton
          onClick={handleToggle}
          disabled={isReasoning || !content}
        >
          {buttonText}

          {!isReasoning && !!content && (
            <ReasoningBlockButtonArrow
              $isOpen={isOpen}
              size={16}
            />
          )}
        </ReasoningBlockButton>

        {isReasoning && <LoaderCircularGradient2Icon size={16} />}
      </ReasoningBlockHeader>

      {mounted && (
        <ReasoningBlockContentWrapper
          style={{
            // @ts-expect-error
            '--reasoning-block-animation-duration': `${animationDuration / 1000}s`,
            height: isOpen && delayedVisible ? bounds.height : 0
          }}
        >
          <div ref={ref}>
            <div />
            <div>
              {typeof content === 'string' ? (
                <MessageMarkdown componentsOverride={markdownComponents()}>
                  {content}
                </MessageMarkdown>
              ) : (
                content
              )}
            </div>
          </div>
        </ReasoningBlockContentWrapper>
      )}
    </div>
  );
};
