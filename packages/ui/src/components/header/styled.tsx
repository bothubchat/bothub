import { styled } from 'styled-components';
import { Container } from '../container';
import { HeaderNavStyled } from './nav';

export const HeaderOffset = styled.div`
  display: flex;
  width: 100%;
  height: ${({ theme }) => theme.header.height};
  background: ${({ theme }) => theme.colors.base.black};
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    height: ${({ theme }) => theme.header.mobile.height};
  }
`;

export const HeaderStyled = styled.header`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.header};
  top: 0px;
  left: 0px;
  right: 0px;
  background: rgba(18, 24, 37, 0.40);
  backdrop-filter: blur(9px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  height: ${({ theme }) => theme.header.height};
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    ${HeaderNavStyled} {
      display: none;
    }
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    height: ${({ theme }) => theme.header.mobile.height};
  }
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
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
