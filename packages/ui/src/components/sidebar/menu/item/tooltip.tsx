import { PropsWithChildren } from 'react';
import { useTheme } from '@/ui/theme';
import {
  SidebarMenuItemTooltipStyled,
  SidebarMenuTooltipArrow,
  SidebarMenuTooltipText,
} from '../styled';

export const SidebarMenuItemTooltip: React.FC<
  {
    hovered: boolean;
    hidden?: boolean;
    active?: boolean;
  } & PropsWithChildren
> = ({ hovered, children, hidden }) => {
  const theme = useTheme();
  return (
    <SidebarMenuItemTooltipStyled
      $isHovered={hovered}
      $isOpen={!hidden}
    >
      <SidebarMenuTooltipArrow
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
      >
        <path
          d="M3.73201 6.0791C4.13179 6.55848 4.86821 6.55848 5.26799 6.0791L8.7611 1.89047C9.30422 1.2392 8.84112 0.25 7.99311 0.25H1.00689C0.15888 0.25 -0.304218 1.2392 0.2389 1.89046L3.73201 6.0791Z"
          fill={
            theme.mode === 'light'
              ? theme.colors.grayScale.gray2
              : theme.colors.grayScale.gray3
          }
        />
      </SidebarMenuTooltipArrow>
      <SidebarMenuTooltipText>{children}</SidebarMenuTooltipText>
    </SidebarMenuItemTooltipStyled>
  );
};
