import { AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';

import { CopyIcon } from '@/ui/icons/copy';
import { CheckSmallIcon } from '@/ui/icons/check-small';

import { ActionButton } from '../action-button';
import { MessageActionEventHandler } from '../../types';

import * as S from '../styled';

export const CopyButton = ({
  id,
  message,
  onCopy,
  tooltipLabel,
  framerVariant,
}: {
  id?: string;
  message?: string;
  onCopy?: MessageActionEventHandler;
  tooltipLabel?: string;
  framerVariant: Variants;
}) => {
  const [copied, setCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleClick = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setCopied(true);
    onCopy?.({
      id,
      message,
    });
    setTimeoutId(setTimeout(() => setCopied(false), 500));
  };

  const iconStylesFramer = {
    animate: {
      opacity: [0, 1],
    },
    exit: {
      opacity: [1, 0],
    },
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  };

  return (
    <ActionButton
      variantsFramer={framerVariant}
      onClick={handleClick}
      tooltipLabel={tooltipLabel}
    >
      <S.MessageActionsButtonIconStyled>
        <AnimatePresence>
          {!copied ? (
            <CopyIcon size={18} {...iconStylesFramer} />
          ) : (
            <CheckSmallIcon fill="#616D8D" {...iconStylesFramer} />
          )}
        </AnimatePresence>
      </S.MessageActionsButtonIconStyled>
    </ActionButton>
  );
};
