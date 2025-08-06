import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';

export const ThemeCardsStyled = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  gap: 34px;
  align-items: center;
  overflow: clip;
  ${adaptive({
    variant: 'dashboard',
    mobile: css`
      flex-direction: column;
    `,
  })}
`;
