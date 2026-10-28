import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Progress } from '@/ui/components/progress';
import { UploadedFileStatus } from './types';
import { Button } from '../button';
import { CloseIcon, LoaderCircularGradientIcon } from '@/ui/icons';
import { ThemeMode, themeVar } from '@/ui/theme';

type IsPrimary = { $isPrimary: boolean };

export const UploadedFileStyled = styled.div<
  { $fullWidth?: boolean } & IsPrimary
>`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  transition: height 0.2s;

  ${({ $isPrimary, theme }) =>
    $isPrimary
      ? css`
          padding: 12px 16px;
          gap: 10px;
          background-color: ${themeVar(theme, 'tokens.gray4Alpha75')};
          border: ${themeVar(theme, 'tokens.uploadedFileBorder')};
        `
      : css`
          width: 430px;
          padding: 14px 16px;
          gap: 8px;
          border: 1px solid ${themeVar(theme, 'colors.grayScale.gray2')};
          background-color: ${themeVar(theme, 'colors.base.black')};
        `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

export const UploadedFileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const UploadedFileIcon = styled.div`
  display: flex;
  padding: 9px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  background-color: ${({ theme }) => themeVar(theme, 'colors.base.black')};
`;

export const UploadedFileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

export const UploadedFileSize = styled(Typography).attrs({
  variant: 'body-xs-medium',
})`
  color: ${({ theme }) => themeVar(theme, 'tokens.textTertiary')};
  text-transform: uppercase;
`;

export const UploadedFileActions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UploadedFileStatusChip = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  padding: 2px 8px;
  background-color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
`;

export const UploadedFileStatusChipText = styled(Typography).attrs({
  variant: 'body-s-medium',
})<{ $status: UploadedFileStatus }>`
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'done':
        return themeVar(theme, 'colors.accent.primary');
      case 'error':
        return themeVar(theme, 'colors.critic');
    }
  }};
`;

export const UploadedFileDeleteButton = styled(Button)`
  &:disabled {
    opacity: 0.4;
  }
`;

export const UploadedFileCloseIcon = styled(CloseIcon)`
  path {
    fill: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
  }
`;

export const UploadedFileFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UploadedFileProgressBar = styled(Progress).attrs({
  fullWidth: true,
})<{ $status: UploadedFileStatus } & IsPrimary>`
  & > div {
    height: 6px;
    border-radius: 4px;
    background-color: ${({ theme }) =>
      themeVar(theme, 'colors.grayScale.gray2')};

    & > div {
      border-radius: 4px;
      background: ${({ theme, $status, $isPrimary }) => {
        switch ($status) {
          case 'error':
            return `${themeVar(theme, 'colors.critic')}`;
          case 'paused':
            return `${themeVar(theme, 'colors.grayScale.gray1')}`;
          default:
            return `${
              $isPrimary
                ? themeVar(theme, 'colors.gradient.light')
                : themeVar(theme, 'colors.gradient.elite')
            }`;
        }
      }};
    }
  }
`;

export const UploadedFileLoaderIcon = styled(LoaderCircularGradientIcon)<{
  /** Mode of the current theme: styles may get a theme of CSS variables. */
  $mode: ThemeMode;
}>`
  ${({ theme, $mode }) =>
    $mode === 'light' &&
    css`
      path {
        fill: ${themeVar(theme, 'colors.base.white')};
      }
    `}
`;

export const UploadedFileProgressValue = styled(Typography).attrs({
  variant: 'body-s-medium',
})<{ $isMax: boolean; $status?: UploadedFileStatus }>`
  flex: 0 0 fit-content;
  color: ${({ theme, $isMax, $status }) => {
    if ($status === 'error') {
      return themeVar(theme, 'colors.critic');
    }
    return $isMax
      ? themeVar(theme, 'colors.accent.primaryLight')
      : themeVar(theme, 'colors.grayScale.gray1');
  }};
`;
