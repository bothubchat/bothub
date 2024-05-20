import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { AttachIcon } from '@/ui/icons/attach';
import { Badge } from '@/ui/components/badge';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons/close';

export interface FileFieldStyledProps {
  $error: boolean;
  $fullWidth: boolean;
  $disabled: boolean;
}

export const FileFieldStyled = styled.label<FileFieldStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  ${({ theme, $error, $disabled }) => (!$error && !$disabled) && css`
    &:hover {
      ${FileFieldBlock} {
        border-color: ${theme.colors.accent.primary};
      }
    }
  `}
  width: 100%;
  ${({ $fullWidth }) => !$fullWidth && css`
    max-width: 420px;
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
}

export const FileFieldBlock = styled.div<FileFieldBlockProps>`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme, $error, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray1;
    }
    if ($error) {
      return theme.colors.critic;
    }

    return theme.colors.grayScale.gray2;
  }};
  background: ${({ theme, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray3;
    }

    return theme.colors.grayScale.gray4;
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
  width: 100%;
`;

export const FileFieldIcon = styled(AttachIcon).attrs(
  ({ theme }) => ({ 
    size: 16,
    fill: theme.colors.base.white
  })
)``;

export const FileFieldInput = styled.input.attrs({ 
  type: 'file',
  accept: 'text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf',
  multiple: true
})`
  display: none;
`;

export const FileFieldPlaceholder = styled(Typography).attrs({ variant: 'input-sm' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const FileFieldFiles = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FileFieldFile = styled(Badge).attrs({ brick: true })``;

export const FileFieldFileDeleteButton = styled(Button).attrs({ variant: 'text', iconSize: 12, children: <CloseIcon /> })``;

export const FileFieldErrorText = styled(Typography).attrs({ variant: 'input-md' })`
  color: ${({ theme }) => theme.colors.critic};
`;
