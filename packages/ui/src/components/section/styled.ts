import { css, styled } from 'styled-components';
import bgLines from './assets/bg-lines.svg';

export interface SectionStyledProps {
  $bg: boolean;
  $bgLines: boolean;
}

export const SectionStyled = styled.section<SectionStyledProps>`
  background: ${({ theme }) => theme.colors.base.black};
  ${({ $bgLines }) => $bgLines && css`
    background-image: url(${JSON.stringify(bgLines)});
    background-position: center;
    background-repeat: no-repeat;
  `}
  ${({ $bg }) => $bg && css`
    position: relative;
    overflow: hidden;
  `}
`;

export const SectionContent = styled.div`
  position: relative;
`;
