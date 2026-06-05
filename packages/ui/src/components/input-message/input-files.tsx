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
import { InputMessageFile, InputMessageFilesStyled } from './styled';

export interface InputMessageFilesProps {
  files: IInputMessageFile[];
  handleDeleteFile?: (index: number) => void;
  handleImageClick?: (payload: IInputMessageFile) => IInputMessageFile;
}

export const InputMessageFiles: React.FC<InputMessageFilesProps> = memo(
  ({ files, handleDeleteFile, handleImageClick }) => {
    if (files.length === 0) {
      return null;
    }

    return (
      <InputMessageFilesStyled>
        {files.map((file, index) => {
          let iconNode: React.ReactNode;
          let isImage: boolean = false;

          if (
            file.previewUrl &&
            (file.name.match(/.png$/i) ||
              file.name.match(/.jpg$/i) ||
              file.name.match(/.jpeg$/i))
          ) {
            isImage = true;
            iconNode = <ChipImage src={file.previewUrl} />;
          } else if (file.name.match(/.txt$/i)) {
            iconNode = <TxtIcon />;
          } else if (file.name.match(/.docx$/i)) {
            iconNode = <WordIcon />;
          } else if (file.name.match(/.xlsx$/i)) {
            iconNode = <XlsIcon />;
          } else if (file.name.match(/.pdf$/i)) {
            iconNode = <PdfIcon />;
          } else {
            iconNode = <AttachFileIcon />;
          }

          iconNode = <IconProvider size={18}>{iconNode}</IconProvider>;

          return (
            <InputMessageFile
              key={file.name}
              start={iconNode}
              isImage={isImage}
              {...(isImage &&
                handleImageClick && {
                  onClick: () => handleImageClick(file),
                })}
              {...(handleDeleteFile && {
                onDelete: () => handleDeleteFile(index),
              })}
            >
              {file.name.length > 20 ? `...${file.name.slice(-20)}` : file.name}
            </InputMessageFile>
          );
        })}
      </InputMessageFilesStyled>
    );
  },
);
