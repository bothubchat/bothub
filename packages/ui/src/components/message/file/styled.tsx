import { styled } from 'styled-components';
import { MessageColor, MessageVariant } from '../types';
import { themeVar } from '@/ui/theme';

export interface MessageFileStyledProps {
  /** С превью картинки плитка крупнее, а поля карточки меньше */
  $withPreview?: boolean;
}

/** Карточка файла из макета: плитка с типом, имя и размер */
export const MessageFileStyled = styled.a<MessageFileStyledProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  max-width: 100%;
  padding: ${({ $withPreview }) =>
    $withPreview ? '6px 12px 6px 6px' : '8px 14px 8px 8px'};
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray3')};
  border-radius: 12px;
  background: ${({ theme }) => themeVar(theme, 'tokens.surfaceRaised')};
  color: ${({ theme }) => themeVar(theme, 'tokens.textStrong')};
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: border-color 120ms ease-out;
  &:hover {
    border-color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => themeVar(theme, 'tokens.borderFocus')};
    outline-offset: 1px;
  }
`;

export interface MessageFileTileProps {
  /** Цвет типа файла: им написано расширение, им же подкрашена плитка */
  $tint: string;
}

/** Плитка с расширением файла: «PDF», «DOCX» */
export const MessageFileTile = styled.span<MessageFileTileProps>`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  overflow: hidden;
  /* Подложка — тот же цвет, что и надпись, но едва заметный */
  background: color-mix(in srgb, ${({ $tint }) => $tint} 16%, transparent);
  color: ${({ $tint }) => $tint};
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

/** Превью картинки в карточке: вместо плитки с расширением */
export const MessageFilePreview = styled.img`
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
`;

export const MessageFileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

export interface MessageFileNameProps {
  /** Не используется: карточка выглядит одинаково у любого сообщения */
  $variant?: MessageVariant;
}

export const MessageFileName = styled.span<MessageFileNameProps>`
  max-width: 100%;
  overflow: hidden;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface MessageFileSizeProps {
  $variant?: MessageVariant;
  $color?: MessageColor;
}

export const MessageFileSize = styled.span<MessageFileSizeProps>`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => themeVar(theme, 'tokens.textSecondary')};
  white-space: nowrap;
`;

/** Несколько файлов: стопкой, у того же края, что и сообщение */
export const MessageFiles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: inherit;
  gap: 6px;
  max-width: 100%;
`;
