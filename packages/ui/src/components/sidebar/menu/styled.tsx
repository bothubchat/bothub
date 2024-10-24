import { css, styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';
import { Scrollbar } from '@/ui/components/scrollbar';

export const SidebarMenuStyled = styled.div`
  ${adaptive({
  variant: 'dashboard',
  tablet: css`
    display: none;
    `,
  mobile: css`
    display: none;
    `
})}
`;

export const SidebarMenuToggleButton = styled(Button)`
  svg {
    pointer-events: none;
  }
`;

export const SidebarMenuBlock = styled(animated.div) <{ $sidebarOpen?: boolean }>`
  display: flex;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.menu};
  top: 53px;
  left: 0px;
  width: 100%;
  background: ${({ theme }) => theme.colors.grayScale.gray7};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 12px;
  overflow: hidden;
  padding: 16px;
  transform-origin: top center;
  ${({ $sidebarOpen }) => !$sidebarOpen && adaptive({
  variant: 'dashboard',
  merge: true,
  desktop: css`
    right: 0px;
    top: 0;
    background: none;
    margin-top: 20px;
    background: none;
    position: relative;
    flex-direction: column;
    padding: 0px;
    border: none;
    border-radius: 0px;
    `,
  tablet: css`
    display: none;
  `
})}
`;

export const SidebarMenuBlockScrollbarWrapper = styled(Scrollbar).attrs({ variant: 'secondary' })`
  width: 100%;
  height: 100%;
  ${adaptive({
  variant: 'dashboard',
  merge: true,
  tablet: css`
    padding-right: 0px;
  `
})}
`;

export const SidebarMenuBlockContent = styled.div``;

export const SidebarMenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.colors.grayScale.gray7};
  ${adaptive({
  variant: 'dashboard',
  merge: true,
  tablet: css`
    gap: 10px;
  `
})}
`;
