import * as S from '../styled';

export const MenuOption = ({
  children,
  onHover,
  onClick,
}: {
  children: React.ReactNode;
  onHover: () => void;
  onClick?: () => void;
}) => (
  <S.MessageActionsMenuModalOption
    onHoverStart={onHover}
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
