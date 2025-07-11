import { styled, css } from 'styled-components';
import { adaptive } from '@/ui/adaptive';

export interface ThemePreviewScreenVersionProps {
  $screen: 'desktop' | 'tablet' | 'mobile';
}

export const ThemePreviewScreenVersion = styled.span<ThemePreviewScreenVersionProps>`
  display: flex;
  justify-content: center;
  ${({ $screen }) =>
    adaptive({
      variant: 'dashboard',
      desktop: css`
        display: ${$screen === 'desktop' ? 'flex' : 'none'};
      `,
      tablet: css`
        display: ${$screen === 'tablet' ? 'flex' : 'none'};
      `,
      mobile: css`
        display: ${$screen === 'mobile' ? 'flex' : 'none'};
      `
    })}
`;
