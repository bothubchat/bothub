export interface MessageFileKind {
  /** Надпись в плитке файла: расширение заглавными */
  label: string;
  /** Цвет надписи и её подложки */
  tint: string;
}

// Цвета типов из макета: читаются на тёмной и на светлой карточке
const TINTS = {
  pdf: '#FF8A8A',
  document: '#8DB2FF',
  table: '#6EE7B7',
  slides: '#FDBA74',
  other: '#9CA3AF',
};

const TINT_BY_EXTENSION: Record<string, string> = {
  pdf: TINTS.pdf,
  doc: TINTS.document,
  docx: TINTS.document,
  rtf: TINTS.document,
  odt: TINTS.document,
  xls: TINTS.table,
  xlsx: TINTS.table,
  csv: TINTS.table,
  ppt: TINTS.slides,
  pptx: TINTS.slides,
};

const LABEL_LIMIT = 4;
const NO_EXTENSION_LABEL = 'FILE';

/** Что написать в плитке файла и каким цветом: по расширению его имени */
export const getFileKind = (name: string): MessageFileKind => {
  const match = /\.([a-z0-9]+)$/i.exec(name.trim());

  if (!match) {
    return { label: NO_EXTENSION_LABEL, tint: TINTS.other };
  }

  const extension = match[1].toLowerCase();

  return {
    label: extension.slice(0, LABEL_LIMIT).toUpperCase(),
    tint: TINT_BY_EXTENSION[extension] ?? TINTS.other,
  };
};
