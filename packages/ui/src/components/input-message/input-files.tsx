import React, { memo } from 'react';
import { IconProvider } from '@/ui/components/icon';
import { IInputMessageFile } from './types';
import { ChipImage } from '@/ui/components/chip';
import {
  AttachFileIcon,
  PdfIcon,
  TxtIcon,
  WordIcon,
  XlsIcon,
} from '@/ui/icons';
import {
  InputMessageFile,
  InputMessageFilesMenuBox,
  InputMessageFilesStyled,
  InputMessageFilesTriggerButton,
} from './styled';
import { Menu } from '../menu';
import { Typography } from '../typography';
import { getFileKeys, isImageFileName } from './utils';

export interface InputMessageFilesProps {
  files: IInputMessageFile[];
  handleDeleteFile?: (index: number) => void;
  handleImageClick?: (payload: IInputMessageFile) => IInputMessageFile;
  deleteFileAriaLabel?: string;
}

const VISIBLE_FILES_COUNT = 3;

const getFileIcon = (file: IInputMessageFile): React.ReactNode => {
  if (file.previewUrl && isImageFileName(file.name)) {
    return <ChipImage src={file.previewUrl} />;
  }
  if (/\.txt$/i.test(file.name)) {
    return <TxtIcon />;
  }
  if (/\.docx$/i.test(file.name)) {
    return <WordIcon />;
  }
  if (/\.xlsx$/i.test(file.name)) {
    return <XlsIcon />;
  }
  if (/\.pdf$/i.test(file.name)) {
    return <PdfIcon />;
  }

  return <AttachFileIcon />;
};

interface InputMessageFileChipProps
  extends Omit<InputMessageFilesProps, 'files'> {
  file: IInputMessageFile;
  index: number;
}

const InputMessageFileChip: React.FC<InputMessageFileChipProps> = ({
  file,
  index,
  handleDeleteFile,
  handleImageClick,
  deleteFileAriaLabel,
}) => {
  const isImage = Boolean(file.previewUrl) && isImageFileName(file.name);

  return (
    <InputMessageFile
      start={<IconProvider size={18}>{getFileIcon(file)}</IconProvider>}
      isImage={isImage}
      {...(isImage &&
        handleImageClick && {
          onClick: () => handleImageClick(file),
        })}
      {...(handleDeleteFile && {
        onDelete: () => handleDeleteFile(index),
      })}
      deleteAriaLabel={deleteFileAriaLabel}
    >
      {file.name.length > 20 ? `...${file.name.slice(-20)}` : file.name}
    </InputMessageFile>
  );
};

export const InputMessageFiles: React.FC<InputMessageFilesProps> = memo(
  ({ files, ...chipProps }) => {
    if (files.length === 0) {
      return null;
    }

    const keys = getFileKeys(files);

    return (
      <InputMessageFilesStyled>
        {files.slice(0, VISIBLE_FILES_COUNT).map((file, index) => (
          <InputMessageFileChip
            key={keys[index]}
            file={file}
            index={index}
            {...chipProps}
          />
        ))}
        {files.length > VISIBLE_FILES_COUNT && (
          <Menu
            trigger={
              <InputMessageFilesTriggerButton variant="text">
                <Typography variant="body-s-medium">
                  +{files.length - VISIBLE_FILES_COUNT}
                </Typography>
              </InputMessageFilesTriggerButton>
            }
          >
            <InputMessageFilesMenuBox>
              {files.slice(VISIBLE_FILES_COUNT).map((file, index) => (
                <InputMessageFileChip
                  key={keys[index + VISIBLE_FILES_COUNT]}
                  file={file}
                  index={index + VISIBLE_FILES_COUNT}
                  {...chipProps}
                />
              ))}
            </InputMessageFilesMenuBox>
          </Menu>
        )}
      </InputMessageFilesStyled>
    );
  },
);
