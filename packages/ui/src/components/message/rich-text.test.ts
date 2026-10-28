import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getRichText, preloadRichText } from './rich-text';

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
    // Paragraphs keep their line breaks in editors that drop <p> margins.
    expect(html).toContain('white-space:pre-wrap');
    expect(html).not.toContain('<p>');
  });

  test('builds the HTML within the call once marked is loaded', async () => {
    const items = getItems(getRichText('line *one*'));

    expect(items['text/html']).toBeInstanceOf(Blob);
    expect(await readBlob(items['text/plain'] as Blob)).toBe('line *one*');
    expect(await readBlob(items['text/html'] as Blob)).toContain(
      '<em>one</em>',
    );
  });
});
