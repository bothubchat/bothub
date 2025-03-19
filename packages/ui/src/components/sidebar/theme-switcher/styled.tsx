import { css, styled } from 'styled-components';
import { DarkIcon } from '@/ui/icons/dark';
import { adaptive } from '@/ui/adaptive';

export interface SidebarThemeSwitcherStyledProps {
  $open: boolean;
}

export const SidebarThemeSwitcherStyled = styled.button<SidebarThemeSwitcherStyledProps>`
  display: ${({ $open }) => ($open ? 'inline-flex' : 'none')};
  width: fit-content;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  border: none;
  border-radius: 200px;
  padding: 2px;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      display: none;
    `,
    tablet: css`
      display: inline-flex;
    `
  })}
`;

export const SidebarThemeSwitcherList = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  position: relative;
`;

export const SidebarThemeSwitcherItem = styled.span`
  display: inline-flex;
  position: relative;
  border-radius: 12px;
  width: 100%;
  padding: 6px;
`;

export const SidebarThemeSwitcherItemBackground = styled.span<{
  $isLight: boolean;
}>`
  display: inline-flex;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  width: calc(50% - 3px);
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  transition:
    transform 0.2s ease-out,
    background 0.2s ease-out;
  transform: ${({ $isLight }) =>
    $isLight ? 'translateX(0%)' : 'translateX(calc(100% + 6px))'};
`;

export const SidebarThemeSwitcherItemContent = styled.span`
  display: inline-flex;
  position: relative;
  padding: 4px;
  width: 100%;
  justify-content: center;
`;

export const SidebarThemeSwitcherIcon = styled(DarkIcon)``;
