import { css, styled } from 'styled-components';
import { Avatar } from '@/ui/components/avatar';
import { TariffPlan } from '@/ui/components/types';

export const SidebarUserInfoAvatarStyled = styled(Avatar)<{
  $tariffPlan?: TariffPlan;
}>`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    ${({ $tariffPlan, theme }) => {
      switch ($tariffPlan) {
        case 'FREE':
          return css`
            border: 2px solid ${theme.colors.grayScale.gray2};
          `;
        case 'BASIC':
          return css`
            border: 2px solid ${theme.colors.accent.primary};
          `;
        case 'PREMIUM':
        case 'DELUXE':
        case 'ELITE':
          return css`
            border: 2px solid transparent;
            background: ${theme.colors.premiumGradient} border-box;
          `;
        default:
          return css``;
      }
    }}
  }
`;
