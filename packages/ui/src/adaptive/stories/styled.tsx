import { styled, css } from 'styled-components';
import { Block } from '@/ui/components/block';
import { Typography } from '@/ui/components/typography';
import { AdaptiveVariant, adaptive } from '@/ui/adaptive';

export const AdaptiveBlockText = styled(Typography).attrs({ variant: 'h1', component: 'h1' })`
  opacity: 0.3;
  transition: opacity 0.3s;
`; 

export const AdaptiveBlockDesktopText = styled(AdaptiveBlockText)`
  color: ${({ theme }) => theme.colors.green};
`;

export const AdaptiveBlockTabletText = styled(AdaptiveBlockText)`
  color: ${({ theme }) => theme.colors.critic};
`;

export const AdaptiveBlockMiniTabletText = styled(AdaptiveBlockText)`
  color: ${({ theme }) => theme.colors.orange};
`;

export const AdaptiveBlockMobileText = styled(AdaptiveBlockText)`
  color: ${({ theme }) => theme.colors.purple};
`;

export const AdaptiveBlockTouchText = styled(AdaptiveBlockText)`
  color: ${({ theme }) => theme.colors.aqua};
`;

export interface AdaptiveBlockStyledProps {
  $variant: AdaptiveVariant;
  $merge: boolean;
  $disableMiniTablet: boolean;
}

export const AdaptiveBlockStyled = styled(Block)<AdaptiveBlockStyledProps>`
  ${adaptive(({ $variant, $merge, $disableMiniTablet }) => ({
    variant: $variant,
    merge: $merge,
    desktop: css`
      ${AdaptiveBlockDesktopText} {
        opacity: 1;
      }
    `,
    tablet: css`
      ${AdaptiveBlockTabletText} {
        opacity: 1;
      }
    `,
    miniTablet: !$disableMiniTablet && css`
      ${AdaptiveBlockMiniTabletText} {
        opacity: 1;
      }
    `,
    mobile: css`
      ${AdaptiveBlockMobileText} {
        opacity: 1;
      }
    `,
    touch: css`
      ${AdaptiveBlockTouchText} {
        opacity: 1;
      }
    `
  }))}
`;
