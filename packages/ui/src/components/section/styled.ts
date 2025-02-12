import { css, styled } from 'styled-components';
import bgLines from './assets/bg-lines.svg';
import { Container } from '@/ui/components/container';

export interface SectionStyledProps {
  $bg: boolean;
  $bgLines: boolean;
  $fullHeight: boolean;
}

export const SectionStyled = styled.section<SectionStyledProps>`
  background: ${({ theme }) => theme.colors.base.black};
  ${({ $bgLines }) =>
    $bgLines &&
    css`
      background-image: url(${JSON.stringify(bgLines)});
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1291px 4797px;
    `}
  ${({ $bg }) =>
    $bg &&
    css`
      position: relative;
      overflow: hidden;
    `}
  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      min-height: calc(100vh - ${({ theme }) => theme.header.height});
      @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
        min-height: calc(100vh - ${({ theme }) => theme.header.mobile.height});
      }
    `}
`;

export interface SectionContentProps {
  $fullHeight: boolean;
}

export const SectionContent = styled.div<SectionContentProps>`
  position: relative;
  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      min-height: inherit;
    `}
`;

export interface SectionContainerProps {
  $fullHeight: boolean;
}

export const SectionContainer = styled(Container)<SectionContainerProps>`
  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      min-height: inherit;
    `}
`;
