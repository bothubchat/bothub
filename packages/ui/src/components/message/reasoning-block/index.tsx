import { ReactNode, useCallback, useState } from 'react';
import { useMeasure } from 'react-use';
import { ArrowUpIcon } from '@/ui/icons';
import { useDelayedVisible } from '@/ui/utils';
import { MessageMarkdown } from '../markdown';
import { ReasoningBlockButton, ReasoningBlockContentWrapper } from './styled';

export type ReasoningBlockProps = {
  content?: string;
  buttonText: ReactNode;
};

export const ReasoningBlock = ({
  content,
  buttonText
}: ReasoningBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const { delayedVisible, mounted } = useDelayedVisible(isOpen, 0, 500);
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  return (
    <div>
      <ReasoningBlockButton
        onClick={handleToggle}
        $isOpen={isOpen}
      >
        {buttonText}

        <ArrowUpIcon size={16} />
      </ReasoningBlockButton>

      {mounted && (
        <ReasoningBlockContentWrapper
          style={{
            height: isOpen && delayedVisible ? bounds.height : 0
          }}
        >
          <div ref={ref}>
            <div />
            <div>
              <MessageMarkdown>{content ?? ''}</MessageMarkdown>
            </div>
          </div>
        </ReasoningBlockContentWrapper>
      )}
    </div>
  );
};
