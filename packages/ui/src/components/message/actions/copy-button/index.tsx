import { useEffect, useRef, useState } from 'react';
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
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleClick = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setCopied(true);
    onCopy?.({});
    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
      setCopied(false);
    }, 1000);
  };

  // A ref, unlike state, gives the unmount cleanup the latest timer.
  useEffect(
    () => () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
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
