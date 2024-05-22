import React from 'react';
import {
  MessageFileInfo, MessageFileName, MessageFileSize, MessageFileStyled 
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { PdfBigIcon } from '@/ui/icons/pdf-big';
import { TxtBigIcon } from '@/ui/icons/txt-big';
import { WordBigIcon } from '@/ui/icons/word-big';
import { XlsBigIcon } from '@/ui/icons/xls-big';
import { useMessage } from '../context';
import { useTheme } from '@/ui/theme';

export interface MessageFileProps extends React.ComponentProps<'a'> {
  icon?: React.ReactNode;
  name: React.ReactNode;
  size: React.ReactNode;
}

export const MessageFile: React.FC<MessageFileProps> = ({
  icon, name, size, ...props
}) => {
  const theme = useTheme();
  const { variant, color } = useMessage();

  let iconNode: React.ReactNode;

  if (typeof name === 'string' && !icon) {
    if (name.match(/.doc$/) || name.match(/.docx$/)) {
      iconNode = <WordBigIcon />;
    } else if (name.match(/.xls$/) || name.match(/.xlsx$/)) {
      iconNode = <XlsBigIcon />;
    } else if (name.match(/.pdf$/)) {
      iconNode = <PdfBigIcon />;
    } else {
      iconNode = <TxtBigIcon />;
    } 
  } else {
    iconNode = icon;
  }

  return (
    <MessageFileStyled
      {...props}
    >
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
