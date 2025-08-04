import { css, styled } from 'styled-components';
import { Radio } from '@/ui/components/radio';
import { adaptive } from '@/ui/adaptive';

export const ThemeSchemeSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ThemeSchemeSectionRadio = styled(Radio)``;

export const ThemeSchemeSectionButtons = styled.div`
  display: flex;
  gap: 34px;
  flex-wrap: wrap;
  align-content: start;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      margin-left: 34px;
    `,
  })}
`;
