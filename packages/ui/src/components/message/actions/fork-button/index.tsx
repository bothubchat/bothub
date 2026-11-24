import { ForkLineIcon } from '@/ui/icons/fork-line';

import { MessageActionEventHandler } from '../../types';
import { ActionButton } from '../action-button';
import { ACTION_ICON_SIZE } from '../constants';

interface ForkButtonProps {
  id?: string;
  message?: string;
  selected?: boolean;
  tooltipLabel?: string | null;
  compact?: boolean;
  onFork?: MessageActionEventHandler;
}

export const ForkButton = ({
  id,
  message,
  selected,
  tooltipLabel,
  compact,
  onFork,
}: ForkButtonProps) => (
  <ActionButton
    id={id}
    message={message}
    active={selected}
    compact={compact}
    aria-pressed={selected}
    tooltipLabel={tooltipLabel}
    onClick={onFork}
  >
    <ForkLineIcon size={ACTION_ICON_SIZE} />
  </ActionButton>
);
