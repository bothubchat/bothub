import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { getFileKind, MessageFile } from '.';

describe('getFileKind', () => {
  test('labels a file with its extension in capitals', () => {
    expect(getFileKind('dogovor_arendy.pdf').label).toBe('PDF');
    expect(getFileKind('Report.DOCX').label).toBe('DOCX');
  });

  test('gives the known document types their own colors', () => {
    const pdf = getFileKind('a.pdf').tint;
    const word = getFileKind('a.docx').tint;
    const table = getFileKind('a.xlsx').tint;

    expect(new Set([pdf, word, table]).size).toBe(3);
    expect(getFileKind('a.doc').tint).toBe(word);
    expect(getFileKind('a.csv').tint).toBe(table);
  });

  test('keeps a long extension within the tile', () => {
    expect(getFileKind('archive.torrent').label).toBe('TORR');
  });

  test('falls back to a neutral tile without an extension', () => {
    const unknown = getFileKind('README');

    expect(unknown.label).toBe('FILE');
    expect(unknown.tint).toBe(getFileKind('notes.md').tint);
  });
});

describe('MessageFile', () => {
  afterEach(() => {
    cleanup();
  });

  test('shows the type, the name and the size of a file', () => {
    customRender(
      <MessageFile
        name="dogovor_arendy.pdf"
        size="2,4 МБ"
        href="#"
      />,
    );

    const link = screen.getByRole('link');

    expect(link.textContent).toBe('PDFdogovor_arendy.pdf2,4 МБ');
  });

  // По хвосту имени и расширению файл узнают
  test('shows the end of a long name', () => {
    const name = `${'a'.repeat(40)}-final.pdf`;
    customRender(
      <MessageFile
        name={name}
        size="1 КБ"
      />,
    );

    expect(screen.getByText(`...${name.slice(-32)}`)).not.toBeNull();
  });

  test('puts custom content into the tile instead of the type', () => {
    const { container } = customRender(
      <MessageFile
        icon={<svg data-testid="own-icon" />}
        name="reference.png"
        size="1024 × 1024"
      />,
    );

    expect(container.querySelector('[data-testid="own-icon"]')).not.toBeNull();
    expect(container.textContent).toBe('reference.png1024 × 1024');
  });

  // Картинка в сообщении пользователя — миниатюра, а не плитка с расширением
  test('shows a thumbnail of an image instead of the type tile', () => {
    const { container } = customRender(
      <MessageFile
        preview="https://cdn.test/reference.png"
        name="reference.png"
        size="1024 × 1024"
      />,
    );

    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      'https://cdn.test/reference.png',
    );
    expect(container.textContent).toBe('reference.png1024 × 1024');
  });
});
