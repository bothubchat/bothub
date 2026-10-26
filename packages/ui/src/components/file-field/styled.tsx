import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { AttachIcon } from '@/ui/icons/attach';
import { Badge } from '@/ui/components/badge';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons/close';
import { themeVar } from '@/ui/theme';

export interface FileFieldStyledProps {
  $error: boolean;
  $fullWidth: boolean;
  $disabled: boolean;
  $open: boolean;
}

export const FileFieldStyled = styled.div<FileFieldStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  ${({ theme, $error, $disabled }) =>
    !$error &&
    !$disabled &&
    css`
      &:hover {
        ${FileFieldBlock} {
          border-color: ${themeVar(theme, 'colors.accent.primary')};
        }
      }
    `}
  width: 100%;
  ${({ $fullWidth }) =>
    !$fullWidth &&
    css`
      max-width: 420px;
    `}
  ${({ $open }) =>
    !$open &&
    css`
      width: fit-content;
      aspect-ratio: 1/1;
      overflow: hidden;
    `}
  user-select: none;
`;

export const FileFieldLabel = styled(Typography).attrs({ variant: 'input-sm' })`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export interface FileFieldBlockProps {
  $error: boolean;
  $disabled: boolean;
  $open: boolean;
}

export const FileFieldBlock = styled.label<FileFieldBlockProps>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, $error, $disabled }) => {
      if ($disabled) {
        return themeVar(theme, 'colors.grayScale.gray1');
      }
      if ($error) {
        return themeVar(theme, 'colors.critic');
      }

      return themeVar(theme, 'colors.grayScale.gray2');
    }};
  background: ${({ theme, $disabled }) => {
    if ($disabled) {
      return themeVar(theme, 'colors.grayScale.gray3');
    }

    return themeVar(theme, 'tokens.surfaceElevated');
  }};
  border-radius: 8px;
  cursor: ${({ $disabled }) => {
    if ($disabled) {
      return 'not-allowed';
    }

    return 'pointer';
  }};
  min-height: 46px;
  padding: 8px 16px;
  gap: 10px;
  ${({ theme, $error }) =>
    !$error &&
    css`
      &:has(input:focus-visible) {
        border-color: ${themeVar(theme, 'colors.accent.primary')};
      }
    `}
  ${({ $open }) =>
    !$open &&
    css`
      padding: 10px;
      gap: 0;
      min-height: 36px;
    `}
  width: 100%;
`;

export const FileFieldIcon = styled(AttachIcon).attrs(({ theme }) => ({
  size: 16,
  fill: themeVar(theme, 'colors.base.white'),
}))``;

export const FileFieldInput = styled.input.attrs({
  type: 'file',
  multiple: true,
})`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

export const FileFieldPlaceholder = styled(Typography).attrs({
  variant: 'input-sm',
})`
  color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
`;

export const FileFieldFiles = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FileFieldFile = styled(Badge).attrs({ brick: true })``;

export const FileFieldFileDeleteButton = styled(Button).attrs({
  variant: 'text',
  iconSize: 12,
  children: <CloseIcon />,
})``;

export const FileFieldErrorText = styled(Typography).attrs({
  variant: 'input-md',
})`
  color: ${({ theme }) => themeVar(theme, 'colors.critic')};
`;
