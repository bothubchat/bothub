import React from 'react';
import { TabStyled, TabText } from './styled';
import { useTheme } from '@/ui/theme';

export interface TabProps extends React.PropsWithChildren {
  className?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Tab: React.FC<TabProps> = ({
  className, active = false, children, onClick
}) => {
  const theme = useTheme();

  return (
    <TabStyled
      $active={active}
      variants={{
        default: {
          borderColor: theme.colors.grayScale.gray3,
          backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        hover: {
          borderColor: theme.colors.grayScale.gray3,
          backgroundColor: theme.colors.grayScale.gray3
        },
        active: {
          borderColor: theme.colors.accent.primary,
          backgroundColor: theme.colors.accent.primary
        },
        tap: {
          y: 1
        }
      }}
      initial={active ? 'active' : 'default'}
      animate={active ? 'active' : 'default'}
      whileHover={!active ? 'hover' : {}}
      whileTap={!active ? 'tap' : {}}
      className={className}
      onClick={onClick}
    >
      {typeof children !== 'string' && children}
      {typeof children === 'string' && (
        <TabText
          $active={active}
        >
          {children}
        </TabText>
      )}
    </TabStyled>
  );
};

export * from './styled';
