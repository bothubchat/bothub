import { styled, css } from 'styled-components';
import { adaptive } from '@/ui/adaptive';

export interface DescriptionCardGridStyledProps {
  $columns: number;
}

export const DescriptionCardGridStyled = styled.div<DescriptionCardGridStyledProps>`
  display: grid;
  justify-items: center;
  gap: 34px;
  ${adaptive(({ $columns }) => ({
  desktop: css`
      grid-template-columns: repeat(${$columns}, 1fr);
    `,
  tablet: css`
      grid-template-columns: repeat(2, 1fr);
    `,
  mobile: css`
      grid-template-columns: 1fr;
    `
}))}
`;
