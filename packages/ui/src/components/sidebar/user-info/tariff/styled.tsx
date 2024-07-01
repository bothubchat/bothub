import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export interface SidebarUserInfoTariffStyledProps {
  $length: number;
}

export const SidebarUserInfoTariffStyled = styled(Typography).attrs({ variant: 'body-m-medium', component: 'span' })<SidebarUserInfoTariffStyledProps>`
  display: inline-flex;
  color: ${({ theme }) => theme.default.colors.base.white};
  background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.grayScale.gray2 : theme.colors.grayScale.gray1)};
  padding: 4px 8px;
  border-radius: 10px;
  ${({ $length }) => $length > 10 && css`
    margin-top: 14px;
    justify-content: center;
    width: 100%;
  `}
`;
