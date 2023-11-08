import { styled, css } from 'styled-components';
import { Block } from '@/ui/components/block';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';

export const AdaptiveBlockText = styled(Typography).attrs({ variant: 'h1', component: 'h1' })`
  display: none;
`; 

export const AdaptiveBlockDesktopText = styled(AdaptiveBlockText)``;

export const AdaptiveBlockTabletText = styled(AdaptiveBlockText)``;

export const AdaptiveBlockMobileText = styled(AdaptiveBlockText)``;

export const AdaptiveBlockTouchText = styled(AdaptiveBlockText)``;

export interface AdaptiveBlockStyledProps {
  $merge: boolean;
}

export const AdaptiveBlockStyled = styled(Block)<AdaptiveBlockStyledProps>`
  ${adaptive(({ theme, $merge }) => ({
    merge: $merge,
    desktop: css`
      ${AdaptiveBlockDesktopText} {
        display: block;
        color: ${theme.colors.green};
      }
    `,
    tablet: css`
      ${AdaptiveBlockTabletText} {
        display: block;
        color: ${theme.colors.critic};
      }
    `,
    mobile: css`
      ${AdaptiveBlockMobileText} {
        display: block;
        color: ${theme.colors.purple};
      }
    `,
    touch: css`
      ${AdaptiveBlockTouchText} {
        display: block;
        color: ${theme.colors.aqua};
      }
    `
  }))}
`;
