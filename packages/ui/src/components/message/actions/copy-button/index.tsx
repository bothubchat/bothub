import { AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';

import { CopyIcon } from '@/ui/icons/copy';
import { CheckSmallIcon } from '@/ui/icons/check-small';

import { ActionButton } from '../action-button';

import * as S from '../styled';

export const CopyButton = ({
  framerVariant,
  onCopy,
  onHoverIn,
  tooltipLabel,
}: {
  framerVariant: Variants;
  onCopy?: () => void;
  onHoverIn?: () => void;
  tooltipLabel?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleClick = () => {
    setCopied(true);
    onCopy?.();
  };
  const handleHoverOut = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(setTimeout(() => setCopied(false), 500));
  };
  const handleHoverIn = () => {
    onHoverIn?.();
    handleHoverOut();
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
      onHoverStart={handleHoverIn}
      onHoverEnd={handleHoverOut}
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
