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
import { getFileKeys, isImageFileName, withLivePreviewUrl } from './utils';
import { useFileThumbnail } from './thumbnail';

export interface InputMessageFilesProps {
  files: IInputMessageFile[];
  handleDeleteFile?: (index: number) => void;
  handleImageClick?: (payload: IInputMessageFile) => IInputMessageFile;
  deleteFileAriaLabel?: string;
}

const VISIBLE_FILES_COUNT = 3;

/**
 * Уменьшенная копия картинки, а не превью в полный кадр. Без неё (браузер
 * не умеет, файл с сервера без данных) — превью, как раньше
 */
const InputMessageFileImage: React.FC<{ file: IInputMessageFile }> = ({
  file,
}) => {
  const thumbnail = useFileThumbnail(
    file.native instanceof Blob ? file.native : undefined,
  );
  const src =
    thumbnail === null
      ? (withLivePreviewUrl(file).previewUrl ?? undefined)
      : thumbnail;

  // Пока миниатюра готовится, на её месте скелетон того же размера
  return (
    <ChipImage
      src={src}
      loading="skeleton"
    />
  );
};

const getFileIcon = (file: IInputMessageFile): React.ReactNode => {
  if (file.previewUrl && isImageFileName(file.name)) {
    return <InputMessageFileImage file={file} />;
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
          onClick: () => handleImageClick(withLivePreviewUrl(file)),
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
