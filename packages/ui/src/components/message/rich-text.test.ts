import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  getMarkdownPlainText,
  getRichText,
  preloadRichText,
} from './rich-text';

class ClipboardItemMock {
  constructor(readonly items: Record<string, Blob | Promise<Blob>>) {}
}

const getItems = (items: ClipboardItem[]) =>
  (items[0] as unknown as ClipboardItemMock).items;

// jsdom's Blob has no text()
const readBlob = (blob: Blob) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText(blob);
  });

describe('rich text copy', () => {
  beforeEach(() => {
    vi.stubGlobal('ClipboardItem', ClipboardItemMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('loads marked once, when the browser is idle', async () => {
    let runIdle: () => void = () => {};
    const requestIdleCallback = vi.fn((callback: () => void) => {
      runIdle = callback;
      return 1;
    });
    vi.stubGlobal('requestIdleCallback', requestIdleCallback);

    preloadRichText();
    preloadRichText();
    expect(requestIdleCallback).toHaveBeenCalledTimes(1);

    // Not loaded yet: the HTML is a promise the clipboard waits for.
    const pending = getItems(getRichText('**a**'))['text/html'];
    expect(pending).toBeInstanceOf(Promise);

    runIdle();
    const html = await readBlob(await pending);
    expect(html).toContain('<strong>a</strong>');
    // Paragraphs stay paragraphs: Word pastes <pre> in a monospace font.
    expect(html).toContain('<p ');
    expect(html).not.toContain('<pre');
  });

  test('builds the HTML within the call once marked is loaded', async () => {
    const items = getItems(getRichText('line *one*'));

    expect(items['text/html']).toBeInstanceOf(Blob);
    expect(await readBlob(items['text/plain'] as Blob)).toBe('line *one*');
    expect(await readBlob(items['text/html'] as Blob)).toContain(
      '<em>one</em>',
    );
  });

  test('copies single line breaks as <br>, also inside list items', async () => {
    const items = getItems(
      getRichText('Name: A\nDate: B\n\n- INTRODUCTION\nFirst clause'),
    );
    const html = await readBlob(items['text/html'] as Blob);

    expect(html).toContain('Name: A<br>Date: B');
    expect(html).toContain('INTRODUCTION<br>First clause');
  });

  test('copies a document block formatted, not as code', async () => {
    const text =
      'Готово:\n\n```doc\n# Policy\n- Custody.\n2.3. All **clients**\n   of the Company.\n```';
    const items = getItems(getRichText(text));
    const html = await readBlob(items['text/html'] as Blob);

    expect(html).toContain('<h1');
    expect(html).toContain('<li');
    expect(html).toContain(
      '2.3. All <strong>clients</strong> of the Company.</p>',
    );
    expect(html).not.toContain('<code');
    // The plain text is the message as it was written.
    expect(await readBlob(items['text/plain'] as Blob)).toBe(text);
  });

  test('copies the text without formatting with the list numbers', async () => {
    const items = getItems(
      getMarkdownPlainText('Готово:\n\n```doc\n1. **Intro**\n- Custody.\n```'),
    );
    const plain = await readBlob(items['text/plain'] as Blob);

    // jsdom has no `innerText`, so the text comes without line breaks.
    expect(plain).toBe('Готово:1. Intro• Custody.');
    expect(items['text/html']).toBeUndefined();
  });
});
