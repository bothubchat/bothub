import { describe, test, expect, afterEach, vi } from 'vitest';
import { processSelection } from './processSelection';

const selectHtml = (html: string): Range => {
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  const range = document.createRange();
  range.selectNodeContents(container);
  return range;
};

describe('processSelection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  test('numbers ordered list items within their own list', () => {
    const range = selectHtml(
      '<ol start="3"><li>a</li><li>b<ol><li>x</li><li>y</li></ol></li><li>c</li></ol><ul><li>d</li></ul>',
    );

    // jsdom has no `innerText`, so the text comes without line breaks.
    expect(processSelection(range, false, false).plain).toBe(
      '3. a4. b  1. x  2. y5. c• d',
    );
    // Telegram markdown escapes the dots only to keep them as text.
    expect(processSelection(range, true, false).plain).toBe(
      '3. a4. b  1. x  2. y5. c• d',
    );
  });

  // Every item used to search its whole list again: 2000 items took seconds.
  test('does not search the list again for every item', () => {
    const countSearches = (length: number) => {
      const items = Array.from({ length }, (_, i) => `<li>${i}</li>`);
      const range = selectHtml(`<ol>${items.join('')}</ol>`);
      const spy = vi.spyOn(Element.prototype, 'querySelectorAll');

      const { plain } = processSelection(range, false, false);
      expect(plain.endsWith(`${length}. ${length - 1}`)).toBe(true);

      const searches = spy.mock.calls.length;
      spy.mockRestore();
      return searches;
    };

    expect(countSearches(300)).toBe(countSearches(3));
  });

  // A detached element returns its `textContent` as `innerText`: no line
  // breaks between paragraphs and list items.
  test('reads the text of an element attached to the document', () => {
    const connected: boolean[] = [];
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      configurable: true,
      get(this: HTMLElement) {
        connected.push(this.isConnected);
        return this.textContent;
      },
    });

    try {
      const range = selectHtml('<p>one</p><p>two</p>');
      const childCount = document.body.childElementCount;

      expect(processSelection(range, false, false).plain).toBe('onetwo');
      expect(processSelection(range, true, false).plain).toBe('onetwo');
      expect(connected).toEqual([true, true]);
      expect(document.body.childElementCount).toBe(childCount);
    } finally {
      // @ts-expect-error jsdom does not define `innerText`.
      delete HTMLElement.prototype.innerText;
    }
  });
});
