import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Progress } from '@/ui/components/progress';
import { UploadedFileStatus } from './types';
import { colorToRgba } from '@/ui/utils';
import { Button } from '../button';

type IsPrimary = {
  $isPrimary: boolean;
};

export const UploadedFileStyled = styled.div<
  {
    $fullWidth?: boolean;
  } & IsPrimary
>`
  ${({ $fullWidth }) => ($fullWidth ? 'width: 100%;' : '')}
  display: flex;
  flex-direction: column;

  ${({ $isPrimary, theme }) =>
    $isPrimary
      ? css`
          padding: 12px 16px;
          gap: 10px;
          border-radius: 10px;
          background-color: ${colorToRgba(theme.colors.grayScale.gray4, 0.75)};
        `
      : css`
          width: 430px;
          padding: 14px 16px;
          gap: 8px;
          border: 1px solid ${theme.colors.grayScale.gray2};
          border-radius: 20px;
          background-color: ${theme.colors.base.black};
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
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background-color: ${({ theme }) => theme.colors.base.black};
`;

export const UploadedFileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

export const UploadedFileSize = styled(Typography).attrs({
  variant: 'body-xs-medium'
})`
  color: ${({ theme }) => theme.colors.grayScale.gray6};
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
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
`;

export const UploadedFileStatusChipText = styled(Typography).attrs({
  variant: 'body-s-medium'
})<{
  $status: UploadedFileStatus;
}>`
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'done':
        return theme.colors.accent.primary;
      case 'error':
        return theme.colors.critic;
    }
  }};
`;

export const UploadedFileDeleteButton = styled(Button)`
  &:disabled {
    opacity: 0.4;
  }
`;

export const UploadedFileFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UploadedFileProgressBar = styled(Progress).attrs({
  fullWidth: true
})<
  {
    $error: boolean;
  } & IsPrimary
>`
  & > div {
    height: 6px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.grayScale.gray2};

    & > div {
      border-radius: 4px;
      background: ${({ theme, $error, $isPrimary }) =>
        $error
          ? theme.colors.critic
          : $isPrimary
            ? theme.colors.accent.primary
            : theme.colors.gradient.elite};
    }
  }
`;

export const UploadedFileProgressValue = styled(Typography).attrs({
  variant: 'body-s-medium'
})`
  flex: 0 0 fit-content;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;
