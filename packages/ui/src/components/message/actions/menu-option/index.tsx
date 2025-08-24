import * as S from '../styled';

export const MenuOption = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <S.MessageActionsMenuModalOption onClick={onClick}>
    {children}
  </S.MessageActionsMenuModalOption>
);
