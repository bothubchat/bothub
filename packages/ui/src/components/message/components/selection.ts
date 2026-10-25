import { css } from 'styled-components';

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
            theme.mode === 'light'
              ? theme.default.colors.accent.primary
              : theme.colors.base.white}${priority};
        color: ${({ theme }) =>
            theme.mode === 'light'
              ? theme.default.colors.base.white
              : theme.colors.accent.primary}${priority};
      `;
    case 'green':
      return css`
        background: ${({ theme }) => theme.default.colors.base.white}${priority};
        color: ${({ theme }) => theme.colors.gpt3}${priority};
      `;
    case 'purple':
      return css`
        background: ${({ theme }) => theme.default.colors.base.white}${priority};
        color: ${({ theme }) => theme.colors.gpt4}${priority};
      `;
    default:
      return css`
        background: ${({ theme }) => theme.default.colors.base.white}${priority};
        color: ${messageColor}${priority};
      `;
  }
};
