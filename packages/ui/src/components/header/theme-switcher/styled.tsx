import { styled, css } from 'styled-components';
import { DarkIcon } from '@/ui/icons/dark';
import { adaptive } from '@/ui/adaptive';

export interface HeaderThemeSwitcherStyledProps {
  $inMenu: boolean;
}

export const HeaderThemeSwitcherStyled = styled.button<HeaderThemeSwitcherStyledProps>`
  ${({ theme, $inMenu }) => {
    if ($inMenu) {
      const adaptiveStyle = adaptive({
        variant: 'dashboard',
        merge: true,
        desktop: css`
          display: none;
        `,
        tablet: `
          display: inline-flex;
          `
      });

      return css`
        width: fit-content;
        overflow: hidden;
        align-items: center;
        cursor: pointer;
        background: ${({ theme }) => theme.colors.grayScale.gray3};
        border: none;
        border-radius: 200px;
        padding: 2px;
        ${adaptiveStyle}
      `;
    }

    const adaptiveStyle = adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`
        display: inline-flex;
      `,
      miniTablet: css`
        display: inline-flex;
      `,
      mobile: css`
        display: none;
      `
    });

    return css`
      flex-shrink: 0;
      align-items: center;
      padding: 2px;
      cursor: pointer;
      background: ${theme.colors.grayScale.gray3};
      border: none;
      border-radius: 200px;
      ${adaptiveStyle}
    `;
  }};
`;

export interface HeaderThemeSwitcherListProps {
  $inMenu: boolean;
}

export const HeaderThemeSwitcherList = styled.span<HeaderThemeSwitcherListProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  ${({ $inMenu }) =>
    $inMenu &&
    css`
      width: 100%;
    `}
  position: relative;
`;

export interface HeaderThemeSwitcherItemProps {
  $inMenu: boolean;
}

export const HeaderThemeSwitcherItem = styled.span<HeaderThemeSwitcherItemProps>`
  display: inline-flex;
  position: relative;
  border-radius: 12px;
  ${({ $inMenu }) =>
    !$inMenu &&
    css`
      padding: 8px;
    `}
  ${({ $inMenu }) =>
    $inMenu &&
    css`
      width: 100%;
      padding: 6px;
    `}
`;

export const HeaderThemeSwitcherItemBackground = styled.span<{
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

export interface HeaderThemeSwitcherItemContentProps {
  $inMenu: boolean;
}

export const HeaderThemeSwitcherItemContent = styled.span<HeaderThemeSwitcherItemContentProps>`
  display: inline-flex;
  position: relative;
  padding: 4px;
  width: 100%;
  justify-content: center;
`;

export const HeaderThemeSwitcherIcon = styled(DarkIcon)``;
