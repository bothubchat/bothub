import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';
import { themeVar } from '@/ui/theme';

export interface TabStyledProps {
  $active: boolean;
}

export const TabStyled: React.FC<
  React.ComponentProps<'button'> & TabStyledProps
> = styled.button<TabStyledProps>`
  display: inline-flex;
  outline: none;
  border: 1px solid
    ${({ theme, $active }) =>
      $active
        ? themeVar(theme, 'colors.accent.primary')
        : themeVar(theme, 'colors.grayScale.gray3')};
  background: ${({ theme, $active }) =>
    $active ? themeVar(theme, 'colors.accent.primary') : 'rgba(0, 0, 0, 0)'};
  border-radius: 8px;
  padding: 0px;
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
  transition:
    border-color 0.3s ease-out,
    background-color 0.3s ease-out,
    transform 0.2s ease-out;
  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => themeVar(theme, 'colors.accent.primary')};
    outline-offset: 2px;
  }
  ${adaptive(() => ({
    merge: true,
    desktop: css`
      padding: 10px 20px;
    `,
    tablet: css`
      padding: 12px 20px;
    `,
  }))}

  ${({ $active }) =>
    !$active &&
    css`
      &:hover {
        border-color: ${({ theme }) =>
          themeVar(theme, 'colors.grayScale.gray3')};
        background-color: ${({ theme }) =>
          themeVar(theme, 'colors.grayScale.gray3')};
      }
      &:active {
        transform: translateY(1px);
      }
    `}
`;

export interface TabTextProps {
  $active: boolean;
}

export const TabText = styled(Typography).attrs({
  variant: 'body-m-semibold',
})<TabTextProps>`
  color: ${({ theme, $active }) => {
    if ($active) {
      return themeVar(theme, 'default.colors.base.white');
    }

    return themeVar(theme, 'colors.base.white');
  }};
`;
