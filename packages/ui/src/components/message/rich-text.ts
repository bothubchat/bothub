import { CLIPBOARD_NORMAL_STYLE, prepareClipboardHtml } from '@/ui/utils';

type Marked = typeof import('marked').marked;

// marked is needed only to copy a message as rich text: it is a separate
// chunk, loaded when the browser is idle after the first message mounts.
let loadedMarked: Marked | null = null;
let markedPromise: Promise<Marked> | null = null;
let isPreloadScheduled = false;

const loadMarked = (): Promise<Marked> => {
  markedPromise ??= import('marked').then(
    ({ marked }) => {
      loadedMarked = marked;
      return marked;
    },
    (error: unknown) => {
      markedPromise = null;
      throw error;
    },
  );

  return markedPromise;
};

/** Loads marked once, when the browser is idle. */
export const preloadRichText = (): void => {
  if (loadedMarked || isPreloadScheduled || typeof window === 'undefined') {
    return;
  }
  isPreloadScheduled = true;

  const load = () => {
    loadMarked().catch(() => {
      isPreloadScheduled = false;
    });
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(load, { timeout: 5000 });
  } else {
    window.setTimeout(load, 2000);
  }
};

const PARAGRAPH_PATTERN = /<p>([\s\S]*?)<\/p>/g;
const PARAGRAPH_REPLACEMENT = `<pre style="${CLIPBOARD_NORMAL_STYLE}font-family:inherit;white-space:pre-wrap;">$1</pre>`;

const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const createHtmlBlob = (html: string): Blob => {
  const content = html.replace(PARAGRAPH_PATTERN, PARAGRAPH_REPLACEMENT);
  return new Blob([prepareClipboardHtml(content)], { type: 'text/html' });
};

const renderHtml = (marked: Marked, text: string): Blob =>
  createHtmlBlob(marked.parse(text, { async: false }));

/**
 * Clipboard items of a message copied as rich text, built synchronously:
 * Safari and WKWebView let a page write to the clipboard only within the
 * click, not after a network wait. If marked is not loaded yet, the HTML is
 * a promise, which ClipboardItem accepts: `clipboard.write()` is still called
 * within the click and waits for it. Without marked the HTML is the plain
 * text.
 */
export const getRichText = (text: string): ClipboardItem[] => {
  const html: Blob | Promise<Blob> = loadedMarked
    ? renderHtml(loadedMarked, text)
    : loadMarked().then(
        (marked) => renderHtml(marked, text),
        () => createHtmlBlob(`<p>${escapeHtml(text)}</p>`),
      );

  return [
    new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' }),
      'text/html': html,
    }),
  ];
};
