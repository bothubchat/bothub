/**
 * Classes of the markdown elements rendered as plain tags. Their styles are
 * rules of the markdown container (`MessageMarkdownStyled`) instead of a
 * styled component and a context subscription per element. A class has the
 * same specificity the styled component class had, so the rules of
 * enclosing components (document blocks) apply as before.
 */
export const markdownClassNames = {
  paragraph: 'bh-md-p',
  bold: 'bh-md-b',
  italic: 'bh-md-i',
  strike: 'bh-md-del',
  blockquote: 'bh-md-quote',
  hr: 'bh-md-hr',
  pre: 'bh-md-pre',
  table: 'bh-md-table',
  tableContent: 'bh-md-table-content',
  tableCell: 'bh-md-cell',
  tableCellText: 'bh-md-cell-text',
  list: 'bh-md-list',
  listItem: 'bh-md-li',
  title: 'bh-md-title',
  link: 'bh-md-a',
} as const;
