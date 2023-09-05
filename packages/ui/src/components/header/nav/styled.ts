import { styled } from 'styled-components';

export const HeaderNavStyled = styled.nav`
  display: flex;
  align-items: center;
  height: 34px;
  gap: 34px;
  padding-left: 24px;
  border-left: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  margin-left: 24px;
`;

export const HeaderNavLink = styled.a`
  display: inline-flex;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.base.white};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.semiBold};
  line-height: 22px;
  &:hover {
    color: ${({ theme }) => theme.colors.accent.primaryLight};
  }
`;
