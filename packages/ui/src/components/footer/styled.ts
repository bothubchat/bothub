import { styled } from 'styled-components';
import { Container } from '../container';
import { Typography } from '../typography';

export const FooterStyled = styled.footer`
  min-width: ${({ theme }) => theme.mobile.minWidth};
  width: 100%;
  padding: 64px 0px;
  background: radial-gradient(51.67% 103.33% at 50% -3.33%, rgba(28, 100, 242, 0.35) 0%, rgba(8, 16, 39, 0.00) 53.98%), #121825;
  background-repeat: no-repeat;
  background-size: 100% 400px;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    background-size: 100% 200px;
  }
`;

export const FooterContainer = styled(Container)`
  display: grid;
  grid-template-columns: 300px 1fr 1fr 1fr 1fr;
  column-gap: 75px;
  row-gap: 46px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 880px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 36px;
  }
`;

export const FooterLogoLink = styled.a`
  display: inline-flex;
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > ${FooterLogoLink} {
    margin-bottom: 20px;
  }
`;

export const FooterColumnLabel = styled(Typography)`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 20px;
`;

export const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
`;

export const FooterText = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

export const FooterNavLink = styled.a`
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.base.white};
  text-decoration: none;
  cursor: default;
  &[href] {
    cursor: pointer;
  }
  svg path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.accent.primaryLight};
    svg path {
      fill: ${({ theme }) => theme.colors.accent.primaryLight};
    }
  }
`;

export const FooterMainColumn = styled(FooterColumn)`
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    & + ${FooterColumn} {
      grid-column-start: 1;
    }
  }
`;
