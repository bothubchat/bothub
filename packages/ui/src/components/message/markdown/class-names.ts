/**
 * Classes of the markdown elements rendered as plain tags. Their styles are
 * rules of the markdown container (`MessageMarkdownStyled`) instead of a
 * styled component and a context subscription per element. The rules are
 * `.container .bh-md-*`: classes only, no tag, so the tag-and-class rules of
 * enclosing components (document blocks) still win over them, and the
 * first/last child margins of MessageMarkdownLine win by coming later.
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
