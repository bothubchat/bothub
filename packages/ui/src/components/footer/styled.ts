import { styled } from 'styled-components';
import { Container } from '../container';
import { Typography } from '../typography';

export const FooterStyled = styled.footer`
  padding: 64px 0px;
  background: radial-gradient(51.67% 103.33% at 50% -3.33%, rgba(28, 100, 242, 0.50) 0%, rgba(8, 16, 39, 0.00) 70.32%), #121825;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
`;

export const FooterContainer = styled(Container)`
  display: flex;
`;

export const FooterLogoLink = styled.a`
  display: inline-flex;
`;

export const FooterColumn = styled.div`
  width: 100%;
  > ${FooterLogoLink} {
    margin-bottom: 20px;
  }
`;

export const FooterColumnLabel = styled(Typography)`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.semiBold};
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
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
  line-height: 18px;
`;

export const FooterNavLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.base.white};
  text-decoration: none;
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
