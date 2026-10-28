import { css } from 'styled-components';
import { getTypographyStyles } from '@/ui/components/typography';
import { themeVar } from '@/ui/theme';
import { cachedStyles } from '@/ui/utils/styles/cachedStyles';
import { MessageColor, MessageVariant } from '../types';
import { messageSelectionStyles } from '../components/selection';
import { markdownClassNames } from './class-names';

export interface MarkdownNodeStylesProps {
  $variant: MessageVariant;
  $color: MessageColor;
}

const node = (name: keyof typeof markdownClassNames) =>
  `.${markdownClassNames[name]}`;

/*
 * The declarations the elements had as Typography, MessageParagraph,
 * MessageBold and the rest, in the same order: the base Typography rules
 * first, the ones of the extending component after them.
 */
const typographyBase = css`
  margin: 0px;
  color: ${({ theme }) => themeVar(theme, 'tokens.interfaceText')};
  font-weight: normal;
  text-decoration: none;
  text-align: left;
  --skeleton-width: 200px;
`;

const bodyText = css`
  ${typographyBase}
  ${getTypographyStyles('body-l-regular')}
`;

const selection = css<MarkdownNodeStylesProps>`
  &::selection {
    ${({ $color }) => messageSelectionStyles($color)}
  }
`;

// White in a colored message, the theme's white otherwise.
const textColor = css<MarkdownNodeStylesProps>`
  color: ${({ theme, $color }) =>
    themeVar(
      theme,
      $color !== 'default' ? 'default.colors.base.white' : 'colors.base.white',
    )};
`;

const cellTextSelection = css<MarkdownNodeStylesProps>`
  ${({ $color }) => {
    switch ($color) {
      case 'default':
        return css`
          background: ${({ theme }) =>
            themeVar(theme, 'tokens.accentContrast')};
          color: ${({ theme }) =>
            themeVar(theme, 'tokens.messageAccentDefault')};
        `;
      case 'green':
        return css`
          background: ${({ theme }) =>
            themeVar(theme, 'tokens.messageAccentGreenInverse')};
          color: ${({ theme }) => themeVar(theme, 'tokens.messageAccentGreen')};
        `;
      case 'purple':
        return css`
          background: ${({ theme }) =>
            themeVar(theme, 'tokens.messageAccentPurpleInverse')};
          color: ${({ theme }) =>
            themeVar(theme, 'tokens.messageAccentPurple')};
        `;
      default:
        return css`
          background: ${({ theme }) =>
            theme.mode === 'light'
              ? $color
              : themeVar(theme, 'default.colors.base.white')};
          color: ${({ theme }) =>
            theme.mode === 'light'
              ? themeVar(theme, 'default.colors.base.white')
              : $color};
        `;
    }
  }}
`;

const titleSizes = {
  h1: { size: 32, lineHeight: 42 },
  h2: { size: 28, lineHeight: 36 },
  h3: { size: 24, lineHeight: 32 },
  h4: { size: 20, lineHeight: 26 },
  h5: { size: 18, lineHeight: 24 },
  h6: { size: 16, lineHeight: 22 },
};

const titleRules = Object.entries(titleSizes).map(
  ([tag, { size, lineHeight }]) => css`
    ${tag}${node('title')} {
      font-size: ${size}px;
      line-height: ${lineHeight}px;
      --bothub-typing-cursor-size: ${lineHeight}px;
    }
  `,
);

const nodeRules = css<MarkdownNodeStylesProps>`
  ${node('paragraph')} {
    ${bodyText}
    color: ${({ theme, $variant }) =>
      themeVar(
        theme,
        $variant === 'user'
          ? 'tokens.paragraphUserText'
          : 'tokens.paragraphAssistantText',
      )};
    margin: 10px 0px;
    overflow-wrap: break-word;
    word-break: normal;
    white-space: pre-wrap;
    &::selection {
      ${({ $variant, $color }) =>
        $variant === 'user'
          ? css`
              background: ${({ theme }) =>
                themeVar(theme, 'tokens.selectionUserBackground')};
              color: ${({ theme }) =>
                themeVar(theme, 'tokens.messageAccentDefault')};
            `
          : messageSelectionStyles($color)}
    }
  }

  ${node('bold')} {
    ${bodyText}
    color: ${({ theme }) => themeVar(theme, 'colors.base.white')};
    font-weight: 700;
    ${selection}
  }

  ${node('italic')} {
    ${bodyText}
    ${textColor}
    font-style: italic;
    ${selection}
  }

  ${node('strike')} {
    ${bodyText}
    ${textColor}
    text-decoration: line-through;
    opacity: 0.85;
    ${selection}
  }

  ${node('link')} {
    ${bodyText}
    ${textColor}
    text-decoration: underline;
    ${selection}
  }

  ${node('blockquote')} {
    margin: 10px 0;
    padding: 4px 0 4px 14px;
    border-left: 3px solid
      ${({ theme, $color }) =>
        themeVar(
          theme,
          $color !== 'default'
            ? 'default.colors.base.white'
            : 'colors.accent.primary',
        )};
    ${textColor}
    opacity: 0.9;
    ${selection}
  }

  ${node('hr')} {
    width: 100%;
    margin: 14px 0;
    border: none;
    border-top: 1px solid
      ${({ theme, $color }) =>
        themeVar(
          theme,
          $color !== 'default' ? 'default.colors.base.white' : 'tokens.divider',
        )};
    opacity: 0.5;
  }

  ${node('pre')} {
    margin: 0px;
    text-wrap: wrap;
  }

  ${node('title')} {
    margin: 0px;
    line-height: 1;
    margin: 10px 0px;
    ${textColor}
    font-weight: 600;
    font-style: normal;
    ${selection}
  }
  ${titleRules}

  ${node('list')} {
    counter-reset: item;
    list-style: none;
    padding: 0px;
    margin: 0px;
    margin-top: 10px;
  }

  ${node('listItem')} {
    ${bodyText}
    display: block;
    position: relative;
    color: ${({ theme }) => themeVar(theme, 'colors.base.white')};
    &:not(:first-child) {
      margin-top: 10px;
    }
    ${selection}
  }
  ul${node('list')} > ${node('listItem')} {
    padding-left: 22px;
    &:before {
      display: inline-block;
      position: absolute;
      left: 0px;
      font-weight: 700;
      color: ${({ theme, $color }) =>
        themeVar(
          theme,
          $color !== 'default'
            ? 'default.colors.base.white'
            : 'colors.accent.primary',
        )};
      padding-right: 8px;
      content: '•';
    }
  }
  ol${node('list')} > ${node('listItem')} {
    &:before {
      display: inline-block;
      position: relative;
      left: 0px;
      padding-right: 8px;
      color: ${({ theme, $color }) =>
        themeVar(
          theme,
          $color !== 'default' ? 'colors.base.white' : 'tokens.listMarker',
        )};
      counter-increment: item;
      content: counter(item) '.';
    }
    & > ol {
      padding-left: 22px;
    }
  }
  ul${node('list')}, ol${node('list')} {
    & > ${node('listItem')}.task-list-item {
      padding-left: 0px;
      &:before {
        content: none;
      }
      > input[type='checkbox'] {
        margin: 0px 8px 0px 0px;
        vertical-align: middle;
      }
    }
  }

  ${node('tableContent')} {
    border: 1px solid
      ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
    border-collapse: separate;
    border-spacing: 0px;
    border-radius: 8px;
    overflow: hidden;
    tr {
      &:first-child {
        ${node('tableCell')} {
          border-top-width: 0px;
        }
      }
      &:not(:first-child) {
        ${node('tableCell')} {
          border-top-width: 0px;
        }
      }
      &:last-child {
        ${node('tableCell')} {
          border-bottom-width: 0px;
        }
      }
      ${node('tableCell')} {
        border-left-width: 0px;
        &:last-child {
          border-right-width: 0px;
        }
      }
    }
    thead ~ tbody {
      tr {
        &:first-child {
          ${node('tableCell')} {
            border-top-width: 1px;
          }
        }
      }
    }
  }

  ${node('tableCell')} {
    border: 1px solid
      ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
    background: ${({ theme }) => themeVar(theme, 'colors.base.black')};
    padding: 10px;
  }
  th${node('tableCell')} {
    background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
  }

  ${node('tableCellText')} {
    ${typographyBase}
    ${getTypographyStyles('body-m-medium')}
    &::selection {
      ${cellTextSelection}
    }
  }
  th${node('tableCell')} > ${node('tableCellText')} {
    color: ${({ theme }) => themeVar(theme, 'default.colors.grayScale.gray6')};
  }
`;

/**
 * Styles of the markdown elements: evaluated once per theme, variant and
 * color, renders of the container only look them up.
 */
export const markdownNodeStyles = cachedStyles<MarkdownNodeStylesProps>(
  nodeRules,
  ({ $variant, $color }) => `${$variant}:${$color}`,
);
