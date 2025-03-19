import { css, styled } from 'styled-components';
import { Container } from '../container';
import { HeaderVariant } from './types';
import { adaptive } from '@/ui/adaptive';

export const HeaderOffset = styled.div`
  display: flex;
  min-width: ${({ theme }) => theme.mobile.minWidth};
  width: 100%;
  height: ${({ theme }) => theme.header.height};
  background: ${({ theme }) => theme.colors.base.black};
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    height: ${({ theme }) => theme.header.mobile.height};
  }
`;

export interface HeaderStyledProps {
  $variant: HeaderVariant;
}

export const HeaderStyled = styled.header<HeaderStyledProps>`
  z-index: ${({ theme }) => theme.zIndex.header};
  width: 100%;
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'main': {
        const adaptiveStyle = adaptive({
          merge: true,
          desktop: css`
            height: ${theme.header.height};
          `,
          mobile: css`
            height: ${theme.header.mobile.height};
          `
        });

        return css`
          position: fixed;
          top: 0px;
          left: 0px;
          right: 0px;
          ${adaptiveStyle}
        `;
      }
      case 'dashboard': {
        const adaptiveStyle = adaptive({
          variant: 'dashboard',
          merge: true,
          desktop: css`
            height: ${theme.dashboard.header.height};
          `,
          tablet: css`
            height: ${theme.dashboard.header.tablet.height};
            z-index: ${theme.zIndex.modal};
          `,
          mobile: css`
            height: ${theme.dashboard.header.mobile.height};
          `
        });

        return css`
          position: relative;
          ${adaptiveStyle}
        `;
      }
    }
  }}
`;

export interface HeaderContentProps {
  $variant: HeaderVariant;
}

export const HeaderContent = styled.div<HeaderContentProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  height: inherit;
  z-index: ${({ theme }) => theme.zIndex.header};
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'main':
        return css`
          border-bottom: 1px solid ${theme.colors.grayScale.gray3};
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
          background-color: rgba(18, 24, 37, 0.4);
        `;
      case 'dashboard': {
        const adaptiveStyle = adaptive({
          variant: 'dashboard',
          desktop: css`
            border-radius: 17px;
            padding: 0px 26.5px;
          `,
          tablet: css`
            border-radius: 17px;
            padding: 0px 18px;
          `,
          mobile: css`
            padding: 0px 16px;
          `
        });

        return css`
          transition: background-color 0.3s;
          background-color: ${theme.colors.grayScale.gray4};
          ${adaptiveStyle}
        `;
      }
    }
  }}
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  position: relative;
`;

export interface HeaderContainerContentProps {
  $variant: 'desktop' | 'tablet' | 'mobile';
}

export const HeaderContainerContent = styled.div<HeaderContainerContentProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: inherit;
  box-sizing: border-box;
  position: relative;
  ${({ $variant }) =>
    adaptive({
      variant: 'dashboard',
      desktop: css`
        display: ${$variant === 'desktop' ? 'flex' : 'none'};
        justify-content: space-between;
      `,
      tablet: css`
        display: ${$variant === 'tablet' ? 'flex' : 'none'};
        border-radius: 0;
        padding: 8px;
        justify-content: space-between;
        z-index: ${({ theme }) => theme.zIndex.modal};
      `,
      mobile: css`
        display: ${$variant === 'mobile' ? 'flex' : 'none'};
        border-radius: 0;
        padding: 8px;
        justify-content: space-between;
        z-index: ${({ theme }) => theme.zIndex.modal};
      `
    })}
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  ${adaptive({
    variant: 'dashboard',
    tablet: css`
      flex: 1;
    `
  })}
`;

export const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  ${adaptive({
    variant: 'dashboard',
    tablet: css`
      flex: 1;
      justify-content: center;
    `
  })}
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  ${adaptive({
    variant: 'dashboard',
    tablet: css`
      gap: 8px;
      flex: 1;
      justify-content: end;
    `
  })}
`;

export const HeaderLogoLink = styled.a`
  display: inline-flex;
  transition: 0.35s opacity;
  &:hover {
    opacity: 0.7;
  }
`;
