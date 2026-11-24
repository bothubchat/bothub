import { useCallback, useEffect, useRef } from 'react';
import { IconProvider } from '@/ui/components/icon';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { useOnClickOutside } from '@/ui/utils';
import {
  MessageVideoSpeedCheck,
  MessageVideoSpeedMenuStyled,
  MessageVideoSpeedOption,
  MessageVideoSpeedOptionText,
} from '../styled';
import { formatPlaybackRate } from '../utils';

export interface MessageVideoSpeedMenuProps {
  rate: number;
  rates: readonly number[];
  label: string;
  isFullScreen: boolean;
  /** The button that opens the menu: a press on it is not a press outside. */
  toggleRef: React.RefObject<HTMLElement | null>;
  onSelect: (rate: number) => void;
  /** `returnFocus`: the menu was closed from the keyboard. */
  onClose: (returnFocus: boolean) => void;
}

export const MessageVideoSpeedMenu: React.FC<MessageVideoSpeedMenuProps> = ({
  rate,
  rates,
  label,
  isFullScreen,
  toggleRef,
  onSelect,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, (event) => {
    if (toggleRef.current?.contains(event.target as Node)) return;
    onClose(false);
  });

  // The chosen rate gets the focus, as in a radio group.
  useEffect(() => {
    menuRef.current
      ?.querySelector<HTMLButtonElement>('[aria-checked="true"]')
      ?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // The player's own keys must not seek or mute while the menu is open.
      event.stopPropagation();

      const options = Array.from(
        menuRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="menuitemradio"]',
        ) ?? [],
      );
      const index = options.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      const focusAt = (next: number) => {
        options[(next + options.length) % options.length]?.focus();
      };

      switch (event.key) {
        case 'ArrowDown':
          focusAt(index + 1);
          break;
        case 'ArrowUp':
          focusAt(index - 1);
          break;
        case 'Home':
          focusAt(0);
          break;
        case 'End':
          focusAt(options.length - 1);
          break;
        case 'Escape':
        case 'Tab':
          onClose(true);
          break;
        default:
          return;
      }

      event.preventDefault();
    },
    [onClose],
  );

  return (
    <MessageVideoSpeedMenuStyled
      ref={menuRef}
      role="menu"
      aria-label={label}
      $isFullScreen={isFullScreen}
      onKeyDown={handleKeyDown}
    >
      {rates.map((value) => {
        const isSelected = value === rate;

        return (
          <MessageVideoSpeedOption
            key={value}
            type="button"
            role="menuitemradio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            $isSelected={isSelected}
            onClick={() => onSelect(value)}
          >
            <MessageVideoSpeedOptionText>
              {formatPlaybackRate(value)}
            </MessageVideoSpeedOptionText>
            {isSelected && (
              <MessageVideoSpeedCheck aria-hidden>
                <IconProvider fill="currentColor">
                  <CheckSmallIcon size={16} />
                </IconProvider>
              </MessageVideoSpeedCheck>
            )}
          </MessageVideoSpeedOption>
        );
      })}
    </MessageVideoSpeedMenuStyled>
  );
};
