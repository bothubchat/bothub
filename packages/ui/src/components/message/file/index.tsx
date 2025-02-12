import React from 'react';
import {
  MessageFileInfo,
  MessageFileName,
  MessageFileSize,
  MessageFileStyled
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { PdfBigIcon } from '@/ui/icons/pdf-big';
import { TxtBigIcon } from '@/ui/icons/txt-big';
import { WordBigIcon } from '@/ui/icons/word-big';
import { XlsBigIcon } from '@/ui/icons/xls-big';
import { useMessage } from '../context';
import { useTheme } from '@/ui/theme';
import { AttachFileBigIcon } from '@/ui/icons/attach-file-big';

export interface MessageFileProps extends React.ComponentProps<'a'> {
  icon?: React.ReactNode;
  name: React.ReactNode;
  size: React.ReactNode;
}

export const MessageFile: React.FC<MessageFileProps> = ({
  icon,
  name,
  size,
  ...props
}) => {
  const theme = useTheme();
  const { variant, color } = useMessage();

  let iconNode: React.ReactNode;

  if (typeof name === 'string' && !icon) {
    if (name.match(/.txt$/i)) {
      iconNode = <TxtBigIcon />;
    } else if (name.match(/.doc$/i) || name.match(/.docx$/i)) {
      iconNode = <WordBigIcon />;
    } else if (name.match(/.xls$/i) || name.match(/.xlsx$/i)) {
      iconNode = <XlsBigIcon />;
    } else if (name.match(/.pdf$/i)) {
      iconNode = <PdfBigIcon />;
    } else {
      iconNode = <AttachFileBigIcon />;
    }
  } else {
    iconNode = icon;
  }

  return (
    <MessageFileStyled {...props}>
      <IconProvider
        fill={theme.default.colors.base.white}
        size={46}
      >
        {iconNode}
      </IconProvider>
      <MessageFileInfo>
        {typeof name === 'string' && (
          <MessageFileName
            $variant={variant}
            $color={color}
          >
            {name.length > 32 && '...'}
            {name.slice(-32)}
          </MessageFileName>
        )}
        {typeof name !== 'string' && name}
        {typeof size === 'string' && (
          <MessageFileSize
            $variant={variant}
            $color={color}
          >
            {size}
          </MessageFileSize>
        )}
        {typeof size !== 'string' && size}
      </MessageFileInfo>
    </MessageFileStyled>
  );
};

export * from './styled';
