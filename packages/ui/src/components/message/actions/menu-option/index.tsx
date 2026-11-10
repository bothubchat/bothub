import * as S from '../styled';

export const MenuOption = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <S.MessageActionsMenuModalOption
    type="button"
    role="menuitem"
    onClick={onClick}
  >
    {children}
  </S.MessageActionsMenuModalOption>
);
