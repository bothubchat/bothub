import * as S from '../styled';

export const MenuOption = ({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  /** Нажатое состояние действия, ушедшего в меню */
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <S.MessageActionsMenuModalOption
    type="button"
    role="menuitem"
    $active={active}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </S.MessageActionsMenuModalOption>
);
