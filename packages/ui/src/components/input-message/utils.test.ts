import { describe, expect, test } from 'vitest';
import { createClipboardData } from '@/ui/tests';
import {
  getClipboardFiles,
  isImageFileName,
  shouldPasteClipboardFiles,
} from './utils';

const image = new File(['png'], 'image.png', { type: 'image/png' });

describe('getClipboardFiles', () => {
  test('returns clipboard files', () => {
    expect(getClipboardFiles(createClipboardData({ files: [image] }))).toEqual([
      image,
    ]);
  });

  test('falls back to file items when files list is empty', () => {
    const clipboardData = createClipboardData({
      itemFiles: [image],
      data: { 'text/plain': 'image.png' },
    });

    expect(getClipboardFiles(clipboardData)).toEqual([image]);
  });

  test('returns nothing for text only', () => {
    const clipboardData = createClipboardData({
      data: { 'text/plain': 'котик' },
    });

    expect(getClipboardFiles(clipboardData)).toEqual([]);
  });
});

describe('shouldPasteClipboardFiles', () => {
  test('image without text (screenshot)', () => {
    expect(
      shouldPasteClipboardFiles(createClipboardData({ files: [image] })),
    ).toBe(true);
  });

  test('image copied from browser comes with <img> html', () => {
    const clipboardData = createClipboardData({
      files: [image],
      data: {
        'text/html':
          '<meta charset="utf-8"><img src="https://example.com/cat.png" alt="Котик">',
      },
    });

    expect(shouldPasteClipboardFiles(clipboardData)).toBe(true);
  });

  test('file copied in Finder comes with its name as plain text', () => {
    const clipboardData = createClipboardData({
      files: [image],
      data: { 'text/plain': 'image.png' },
    });

    expect(shouldPasteClipboardFiles(clipboardData)).toBe(true);
  });

  test('office table keeps text instead of png preview', () => {
    const clipboardData = createClipboardData({
      files: [image],
      data: {
        'text/plain': 'Выручка\t100',
        'text/html': '<table><tr><td>Выручка</td><td>100</td></tr></table>',
      },
    });

    expect(shouldPasteClipboardFiles(clipboardData)).toBe(false);
  });
});

describe('isImageFileName', () => {
  test('matches png and jpeg extensions in any case', () => {
    expect(isImageFileName('cat.png')).toBe(true);
    expect(isImageFileName('cat.JPG')).toBe(true);
    expect(isImageFileName('cat.jpeg')).toBe(true);
  });

  test('requires a dot before the extension', () => {
    expect(isImageFileName('apng')).toBe(false);
    expect(isImageFileName('notes-jpeg')).toBe(false);
    expect(isImageFileName('cat.png.txt')).toBe(false);
  });
});
