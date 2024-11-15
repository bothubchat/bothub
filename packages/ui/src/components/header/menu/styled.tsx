import { css, styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { HeaderVariant } from '../types';
import { adaptive } from '@/ui/adaptive';
import { HeaderNavLinkStyled } from '../nav/link/styled';

export interface HeaderMenuStyledProps {
  $variant: HeaderVariant;
  $isPreset?: boolean;
}

export const HeaderMenuStyled = styled.div`
  position: relative;
`;

export const HeaderMenuContent = styled(animated.div) <HeaderMenuStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  background: ${({ theme }) => theme.colors.base.black};
  gap: 40px;
  overflow: auto;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: ${({ theme }) => theme.zIndex.headerMenu};
  ${({ theme, $variant, $isPreset }) => {
    switch ($variant) {
      case 'main':
        return adaptive({
          variant: $variant,
          desktop: css`
            display: none;
            height: calc(100vh - ${theme.header.height});
          `,
          tablet: css`
            padding: 42px 40px;
            height: calc(100vh - ${theme.header.height});
          `,
          mobile: css`
            padding: 32px 30px;
            height: calc(100vh - ${theme.header.mobile.height});
          `
        });
      case 'dashboard':
        return adaptive({
          variant: $variant,
          desktop: css`
            display: none;
            height: calc(100vh - ${theme.dashboard.header.height});
          `,
          tablet: css`
            ${$isPreset ? '' : 'display: none;'}
            padding: 42px 18px;
            height: calc(100vh - ${theme.dashboard.header.tablet.height});
          `,
          mobile: css`
             ${$isPreset ? '' : 'display: none;'}
            padding: 32px 16px;
            height: calc(100vh - ${theme.dashboard.header.mobile.height});
          `
        });
    }
  }}
`;
