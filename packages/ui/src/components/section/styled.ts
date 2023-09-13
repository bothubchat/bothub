import { css, styled } from 'styled-components';
import bgLines from './assets/bg-lines.svg';

export const SectionStyled = styled.section<{ $bgLines: boolean }>`
  background: ${({ theme }) => theme.colors.base.black};
  ${({ $bgLines }) => $bgLines && css`
    background-image: url(${JSON.stringify(bgLines)});
    background-position: center;
    background-repeat: no-repeat;
  `}
`;
