import { css } from 'styled-components';
import { themeVar } from '@/ui/theme';

/**
 * Colors of selected text in an assistant message of the given color.
 * `important` lets them win over the colors of highlighted code.
 */
export const messageSelectionStyles = (
  messageColor: string,
  important = false,
) => {
  const priority = important ? ' !important' : '';

  switch (messageColor) {
    case 'default':
      return css`
        background: ${({ theme }) =>
            themeVar(theme, 'tokens.accentContrast')}${priority};
        color: ${({ theme }) =>
            themeVar(theme, 'tokens.messageAccentDefault')}${priority};
      `;
    case 'green':
      return css`
        background: ${({ theme }) =>
            themeVar(theme, 'default.colors.base.white')}${priority};
        color: ${({ theme }) => themeVar(theme, 'colors.gpt3')}${priority};
      `;
    case 'purple':
      return css`
        background: ${({ theme }) =>
            themeVar(theme, 'default.colors.base.white')}${priority};
        color: ${({ theme }) => themeVar(theme, 'colors.gpt4')}${priority};
      `;
    default:
      return css`
        background: ${({ theme }) =>
            themeVar(theme, 'default.colors.base.white')}${priority};
        color: ${messageColor}${priority};
      `;
  }
};
