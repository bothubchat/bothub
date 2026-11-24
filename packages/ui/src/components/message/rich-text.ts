import { prepareClipboardHtml, processSelection } from '@/ui/utils';
import {
  formatMessageDocumentLines,
  unwrapDocumentBlocks,
} from './markdown/utils';

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

const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const createHtmlBlob = (html: string): Blob =>
  new Blob([prepareClipboardHtml(html)], { type: 'text/html' });

// The markdown the message shows: a document block is copied as formatted
// text, not as code, and its lines are laid out as in the message.
const getShownMarkdown = (text: string): string =>
  formatMessageDocumentLines(unwrapDocumentBlocks(text));

// A single newline is a line break, as in the message: editors ignore
// `pre-wrap` on paste and join such lines, also inside list items.
const parseMarkdown = (marked: Marked, text: string): string =>
  marked.parse(getShownMarkdown(text), { async: false, breaks: true });

const renderHtml = (marked: Marked, text: string): Blob =>
  createHtmlBlob(parseMarkdown(marked, text));

const createTextBlob = (text: string): Blob =>
  new Blob([text], { type: 'text/plain' });

// The text the message shows, with the numbers and markers of its lists,
// without the buttons and labels around it.
const renderPlainText = (marked: Marked, text: string): Blob => {
  const root = document.createElement('div');
  root.innerHTML = parseMarkdown(marked, text);
  const range = document.createRange();
  range.selectNodeContents(root);

  return createTextBlob(processSelection(range, false, false).plain.trim());
};

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
        () =>
          createHtmlBlob(`<p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>`),
      );

  return [
    new ClipboardItem({
      'text/plain': createTextBlob(text),
      'text/html': html,
    }),
  ];
};

/**
 * Clipboard items of a message copied without formatting, built within the
 * click as `getRichText`. Without marked the text is the markdown as is.
 */
export const getMarkdownPlainText = (text: string): ClipboardItem[] => {
  const plain: Blob | Promise<Blob> = loadedMarked
    ? renderPlainText(loadedMarked, text)
    : loadMarked().then(
        (marked) => renderPlainText(marked, text),
        () => createTextBlob(text),
      );

  return [new ClipboardItem({ 'text/plain': plain })];
};
