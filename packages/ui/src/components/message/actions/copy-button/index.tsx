import { useEffect, useState } from 'react';
import { useSpring } from '@react-spring/web';

import { CopyIcon } from '@/ui/icons/copy';
import { CheckSmallIcon } from '@/ui/icons/check-small';

import { ActionButton } from '../action-button';
import { MessageActionEventHandler } from '../../types';

import { MessageActionsButtonIconStyled } from './styled';

export const CopyButton = ({
  onCopy,
  tooltipLabel
}: {
  onCopy?: MessageActionEventHandler;
  tooltipLabel?: string | null;
}) => {
  const [copied, setCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleClick = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setCopied(true);
    onCopy?.({});
    setTimeoutId(setTimeout(() => setCopied(false), 1000));
  };

  const copySpring = useSpring({
    opacity: copied ? 0 : 1,
    config: {
      duration: 250
    }
  });
  const markSpring = useSpring({
    opacity: copied ? 1 : 0,
    config: {
      duration: 250
    }
  });

  useEffect(
    () => () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },
    []
  );

  return (
    <ActionButton
      onClick={handleClick}
      tooltipLabel={tooltipLabel}
    >
      {!copied ? (
        <MessageActionsButtonIconStyled style={copySpring}>
          <CopyIcon size={20} />
        </MessageActionsButtonIconStyled>
      ) : (
        <MessageActionsButtonIconStyled style={markSpring}>
          <CheckSmallIcon fill="#4785FF" />
        </MessageActionsButtonIconStyled>
      )}
    </ActionButton>
  );
};
