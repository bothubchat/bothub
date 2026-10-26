import { useSpring } from '@react-spring/web';

import { CopyIcon } from '@/ui/icons/copy';
import { CheckSmallIcon } from '@/ui/icons/check-small';

import { ActionButton } from '../action-button';
import { MessageActionEventHandler } from '../../types';

import { MessageActionsButtonIconStyled } from './styled';
import { useTheme } from '@/ui/theme';
import { useCopiedState } from '@/ui/utils/useCopiedState';

export const CopyButton = ({
  onCopy,
  tooltipLabel,
}: {
  onCopy?: MessageActionEventHandler;
  tooltipLabel?: string | null;
}) => {
  const theme = useTheme();

  const { copied, markCopied } = useCopiedState(1000);

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
    markCopied();
    onCopy?.({});
  };

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
