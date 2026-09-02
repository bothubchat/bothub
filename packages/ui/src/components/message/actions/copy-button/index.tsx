import { useCallback, useEffect, useRef, useState } from 'react';
import { useSpring } from '@react-spring/web';

import { CopyIcon } from '@/ui/icons/copy';
import { CheckSmallIcon } from '@/ui/icons/check-small';

import { ActionButton } from '../action-button';
import { MessageActionEventHandler } from '../../types';

import { MessageActionsButtonIconStyled } from './styled';
import { useTheme } from '@/ui/theme';

export const CopyButton = ({
  onCopy,
  tooltipLabel,
}: {
  onCopy?: MessageActionEventHandler;
  tooltipLabel?: string | null;
}) => {
  const theme = useTheme();

  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copySpring = useSpring({
    opacity: copied ? 0 : 1,
    config: {
      duration: 250,
    },
  });
  const markSpring = useSpring({
    opacity: copied ? 1 : 0,
    config: {
      duration: 250,
    },
  });

  const handleClick = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCopied(true);
    onCopy?.({});
    timeoutRef.current = setTimeout(() => setCopied(false), 1000);
  }, [onCopy]);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
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
          <CheckSmallIcon
            {...(theme.scheme === 'custom' && {
              fill: theme.colors.custom.icon,
            })}
          />
        </MessageActionsButtonIconStyled>
      )}
    </ActionButton>
  );
};
