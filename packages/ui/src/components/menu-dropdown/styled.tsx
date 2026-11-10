import { css, styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';
import { Scrollbar } from '../scrollbar';
import { themeVar } from '@/ui/theme';

export const MenuDropdownStyled = styled.div``;

export const MenuDropdownToggleButton = styled(Button)`
  margin-left: 0px;
  svg {
    pointer-events: none;
  }
`;

export const MenuDropdownBlock = styled(animated.div)`
  display: flex;
  position: absolute;
  width: fit-content;
  z-index: ${({ theme }) => theme.zIndex.menu};
  top: 60px;
  left: 16px;
  background: ${({ theme }) => themeVar(theme, 'colors.base.black')};
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray3')};
  border-radius: 12px;
  overflow: hidden;
  padding: 16px;
  padding-right: 8px;
  transform-origin: top center;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      right: 9px;
    `,
    tablet: css`
      right: 7px;
    `,
  })}
`;

export const MenuDropdownBlockScrollbarWrapper = styled(Scrollbar).attrs({
  variant: 'secondary',
})`
  width: 100%;
  padding-right: 8px;
  @media (max-height: 720px) {
    max-height: 400px;
  }
`;

export const MenuDropdownBlockContent = styled.div``;

export const MenuDropdownNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
