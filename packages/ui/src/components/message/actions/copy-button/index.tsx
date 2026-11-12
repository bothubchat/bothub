import { useSpring } from '@react-spring/web';

import { CopyLineIcon } from '@/ui/icons/copy-line';
import { CheckLineIcon } from '@/ui/icons/check-line';

import { ActionButton } from '../action-button';
import { MessageActionEventHandler } from '../../types';
import { ACTION_ICON_SIZE } from '../constants';

import { MessageActionsButtonIconStyled } from './styled';
import { useCopiedState } from '@/ui/utils/useCopiedState';

export const CopyButton = ({
  onCopy,
  tooltipLabel,
  compact,
}: {
  onCopy?: MessageActionEventHandler;
  tooltipLabel?: string | null;
  compact?: boolean;
}) => {
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
      compact={compact}
      onClick={handleClick}
      tooltipLabel={tooltipLabel}
    >
      {!copied ? (
        <MessageActionsButtonIconStyled style={copySpring}>
          <CopyLineIcon size={ACTION_ICON_SIZE} />
        </MessageActionsButtonIconStyled>
      ) : (
        <MessageActionsButtonIconStyled style={markSpring}>
          <CheckLineIcon size={ACTION_ICON_SIZE} />
        </MessageActionsButtonIconStyled>
      )}
    </ActionButton>
  );
};
