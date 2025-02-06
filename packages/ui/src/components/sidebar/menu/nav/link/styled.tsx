import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';

export interface SidebarMenuNavLinkStyledProps {
  $active: boolean;
}

export const SidebarMenuNavLinkText = styled(Typography).attrs({
  variant: 'body-m-medium'
})<{ $open?: boolean }>`
  ${({ $open, theme }) =>
    !$open
      ? adaptive({
          variant: 'dashboard',
          desktop: css`
            position: fixed;
            transition: 0.25s all;
            padding: 8px;
            background: ${theme.colors.grayScale.gray2};
            border-radius: 6px;
            display: block;
            z-index: 40;
            left: 120px;
            white-space: nowrap;
            &:after {
              content: '';
              position: absolute;
              top: 50%;
              left: -5px;
              transform: translateY(-50%);
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 10px 10px 10px 0;
              border-color: transparent ${theme.colors.grayScale.gray2}
                transparent transparent;
            }
          `,
          tablet: css`
            display: flex;
          `,
          mobile: css`
            display: flex;
          `
        })
      : adaptive({
          variant: 'dashboard',
          desktop: css`
            display: flex;
          `,
          tablet: css`
            display: none;
          `
        })}
`;

export const SidebarMenuNavLinkStyled = styled.a<SidebarMenuNavLinkStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  opacity: 0.75;
  ${({ $active }) =>
    !$active &&
    css`
      transition: 0.25s opacity;
      &:hover {
        opacity: 1;
      }
    `}
`;

export const SidebarMenuNavIcon = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  ${({ $active }) =>
    $active &&
    css`
      background: ${({ theme }) => theme.colors.grayScale.gray3};
    `}
  &:hover ~ ${SidebarMenuNavLinkText} {
    left: 100px;
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.grayScale.gray1
        : 'rgba(159, 189, 251, 1);'};
    &:after {
      border-color: transparent
        ${({ theme }) =>
          theme.mode === 'dark'
            ? theme.colors.grayScale.gray1
            : 'rgba(159, 189, 251, 1)'}
        transparent transparent;
    }
  }
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
`;
