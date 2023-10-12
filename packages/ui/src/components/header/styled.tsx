import { css, styled } from 'styled-components';
import { Container } from '../container';
import { HeaderNavStyled } from './nav';
import { HeaderVariant } from './types';

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

export const HeaderStyled = styled.header<{ $variant: HeaderVariant }>`
  z-index: ${({ theme }) => theme.zIndex.header};
  min-width: ${({ theme }) => theme.mobile.minWidth};
  width: 100%;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    ${HeaderNavStyled} {
      display: none;
    }
  }
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'main-page':
        return css`
          position: fixed;
          top: 0px;
          left: 0px;
          right: 0px;
          border-bottom: 1px solid ${theme.colors.grayScale.gray3};
          backdrop-filter: blur(9px);
          background: rgba(18, 24, 37, 0.40);
          height: ${theme.header.height};
          @media (max-width: ${theme.mobile.maxWidth}) {
            height: ${theme.header.mobile.height};
          }
        `;
      case 'dashboard':
        return css`
          height: ${theme.dashboard.header.height};
          @media (max-width: ${theme.tablet.maxWidth}) {
            height: ${theme.dashboard.header.tablet.height};
          }
          @media (max-width: ${theme.mobile.maxWidth}) {
            height: ${theme.dashboard.header.mobile.height};
          }
        `;
    }
  }}
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
`;

export const HeaderContent = styled.div<{ $variant: HeaderVariant }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: inherit;
  box-sizing: border-box;
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'main-page':
        return css``;
      case 'dashboard':
        return css`
          background: ${theme.colors.grayScale.gray4};
          border-radius: 17px;
          padding: 24px 26.5px;
        `;
    }
  }}
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    gap: 24px;
  }
`;

export const HeaderLogoLink = styled.a`
  display: inline-flex;
  transition: 0.35s opacity;
  &:hover {
    opacity: 0.7;
  }
`;
