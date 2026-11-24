import React, { MutableRefObject } from 'react';
import * as S from '../styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { MessageActionEventHandler } from '../../types';
import { MenuOption } from '../menu-option';
import { useActionPlacement } from '../placement';
import { isTouchOnly } from '../media';

export interface ActionButtonProps {
  id?: string;
  ref?: MutableRefObject<HTMLButtonElement | null>;
  message?: string;
  /**
   * Подпись действия: подсказка у кнопки и текст пункта, когда действие не
   * поместилось в ряд и ушло в меню «ещё»
   */
  tooltipLabel?: string | null;
  /** Нажатое состояние: поставленная оценка, выбранное сообщение */
  active?: boolean;
  /** Ряд под пузырём пользователя ниже обычного */
  compact?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: MessageActionEventHandler;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onPointerEnter?: React.PointerEventHandler<HTMLButtonElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
  'aria-haspopup'?: boolean | 'true' | 'false' | 'menu' | 'dialog' | 'listbox';
}

/**
 * Кнопка в ряду действий под сообщением. Из таких же собирают свои действия
 * для слота actionsAddon: оценку, озвучку. Когда ряду тесно, кнопка сама
 * становится пунктом меню «ещё» — со значком и подписью
 */
export const ActionButton = ({
  id,
  ref,
  message,
  tooltipLabel,
  active,
  compact,
  disabled,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ActionButtonProps) => {
  const { inMenu, onSelect } = useActionPlacement();

  if (inMenu) {
    return (
      <MenuOption
        active={active}
        disabled={disabled}
        onClick={() => {
          onClick?.({ id, message });
          onSelect?.();
        }}
      >
        <S.MessageActionsMenuModalOptionContent>
          {children}
          <S.MessageActionsButtonText>
            {tooltipLabel}
          </S.MessageActionsButtonText>
        </S.MessageActionsMenuModalOptionContent>
      </MenuOption>
    );
  }

  return (
    <Tooltip
      label={tooltipLabel}
      placement="top"
      align="center"
    >
      <TooltipConsumer>
        {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
          <S.MessageActionsButton
            ref={ref}
            type="button"
            $active={active}
            $compact={compact}
            disabled={disabled}
            aria-label={tooltipLabel ?? undefined}
            onClick={() => {
              onClick?.({ id, message });
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              // После касания подсказка осталась бы висеть над кнопкой
              if (!isTouchOnly()) {
                handleTooltipMouseEnter(e);
              }
              onMouseEnter?.();
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleTooltipMouseLeave(e);
              onMouseLeave?.();
            }}
            {...props}
          >
            {children}
          </S.MessageActionsButton>
        )}
      </TooltipConsumer>
    </Tooltip>
  );
};
