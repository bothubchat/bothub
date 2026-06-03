import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useDelayedVisible } from '@/ui/utils';
import { LoaderCircularGradient2Icon } from '@/ui/icons/loader-circular-gradient-2';
import { MessageMarkdown } from '../markdown';
import {
  ReasoningBlockButton,
  ReasoningBlockButtonArrow,
  ReasoningBlockContentWrapper,
  ReasoningBlockHeader,
  ReasoningBlockStyled,
} from './styled';

import { useMeasure } from '@/ui/utils/useMeasure';
import { reasoningComponentsOverride } from './markdown-components';

export type ReasoningBlockProps = {
  content?: string | ReactNode;
  buttonText: ReactNode;
  isReasoning?: boolean;
  fullWidth?: boolean;
};

const preprocessReasoningContent = (content: string): string => {
  let processed = content;

  processed = processed.replace(
    /([.!?…»")\]])[ \t]*\n?(\*\*[A-ZА-ЯЁ])/g,
    '$1\n\n$2',
  );

  processed = processed.replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2');

  return processed;
};

export const MessageReasoningBlock = ({
  content,
  buttonText,
  isReasoning,
  fullWidth = false,
}: ReasoningBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    if (isReasoning) return;
    setIsOpen((prev) => !prev);
  }, [isReasoning]);

  const processedContent = useMemo(
    () =>
      typeof content === 'string'
        ? preprocessReasoningContent(content)
        : content,
    [content],
  );

  const [ref, bounds] = useMeasure<HTMLDivElement>();

  const animationDuration = isReasoning
    ? 150
    : Math.max(Math.min(bounds.height, 650), 300);

  const { delayedVisible, mounted } = useDelayedVisible(
    isOpen,
    0,
    animationDuration,
  );

  useEffect(() => {
    if (isReasoning) {
      setIsOpen(true);
    } else setIsOpen(false);
  }, [isReasoning]);

  return (
    <ReasoningBlockStyled $fullWidth={fullWidth}>
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
          $isReasoning={!!isReasoning}
          $fullWidth={fullWidth}
          style={{
            // @ts-expect-error
            '--reasoning-block-animation-duration': `${animationDuration / 1000}s`,
            '--reasoning-block-timing': isReasoning
              ? 'ease-out'
              : 'ease-in-out',
            height: isOpen && delayedVisible ? bounds.height : 0,
          }}
        >
          <div ref={ref}>
            <div />
            <div>
              {typeof processedContent === 'string' ? (
                <MessageMarkdown
                  componentsOverride={reasoningComponentsOverride}
                  disableTyping
                >
                  {processedContent}
                </MessageMarkdown>
              ) : (
                processedContent
              )}
            </div>
          </div>
        </ReasoningBlockContentWrapper>
      )}
    </ReasoningBlockStyled>
  );
};
