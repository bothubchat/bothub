import * as S from '../styled';

export const MenuOption = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <S.MessageActionsMenuModalOption
    whileTap={{
      filter: 'brightness(0.8)',
      translateY: 1,
      transition: {
        duration: 0.01,
        ease: 'easeInOut',
      },
    }}
    onClick={onClick}
  >
    {children}
  </S.MessageActionsMenuModalOption>
);