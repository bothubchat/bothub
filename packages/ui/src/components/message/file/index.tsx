import React from 'react';
import {
  MessageFileInfo,
  MessageFileName,
  MessageFilePreview,
  MessageFileSize,
  MessageFileStyled,
  MessageFileTile,
} from './styled';
import { getFileKind } from './kind';

export interface MessageFileProps extends React.ComponentProps<'a'> {
  /** Своё содержимое плитки вместо расширения */
  icon?: React.ReactNode;
  /** Адрес превью: картинка показывается миниатюрой вместо плитки */
  preview?: string;
  name: React.ReactNode;
  size: React.ReactNode;
}

// Длинное имя показываем с конца: по расширению и хвосту файл узнают
const NAME_LIMIT = 32;

export const MessageFile: React.FC<MessageFileProps> = ({
  icon,
  preview,
  name,
  size,
  ...props
}) => {
  const kind = getFileKind(typeof name === 'string' ? name : '');

  return (
    <MessageFileStyled
      $withPreview={!!preview}
      {...props}
    >
      {preview ? (
        <MessageFilePreview
          src={preview}
          alt=""
        />
      ) : (
        <MessageFileTile
          $tint={kind.tint}
          aria-hidden
        >
          {icon ?? kind.label}
        </MessageFileTile>
      )}
      <MessageFileInfo>
        {typeof name === 'string' && (
          <MessageFileName>
            {name.length > NAME_LIMIT && '...'}
            {name.slice(-NAME_LIMIT)}
          </MessageFileName>
        )}
        {typeof name !== 'string' && name}
        {typeof size === 'string' && <MessageFileSize>{size}</MessageFileSize>}
        {typeof size !== 'string' && size}
      </MessageFileInfo>
    </MessageFileStyled>
  );
};

export * from './styled';
export * from './kind';
