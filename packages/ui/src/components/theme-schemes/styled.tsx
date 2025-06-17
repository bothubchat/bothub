import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';

export const ThemeSchemesStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;

  ${adaptive({
    variant: 'dashboard',
    tablet: css`
      flex-direction: row;
    `
  })}
`;
