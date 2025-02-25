import { styled } from 'styled-components';
import { Badge } from '@/ui/components/badge';
import { Typography } from '@/ui/components/typography';

export const BothubAppBannerMiniStyled = styled.a`
  position: relative;
  background: ${({ theme }) => theme.colors.premiumGradient};
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 14px;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.2;
    background: #000;
  }
  &:hover {
    &:before {
      opacity: 0.4;
    }
  }
`;

export const BothubAppBannerMiniBadge = styled(Badge).attrs({
  variant: 'blue',
  children: 'New'
})`
  width: fit-content;
  z-index: 1;
  margin-right: 8px;
`;

export const BothubAppBannerMiniTitle = styled(Typography).attrs({
  variant: 'body-l-regular'
})`
  z-index: 1;
  display: flex;
  align-items: center;
`;

export const BothubAppBannerMiniText = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  z-index: 1;
`;
