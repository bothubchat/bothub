/**
 * `field-sizing: content` sizes the textarea to its text in CSS (Chromium
 * 123+): no height is measured in JS. Checked the way the styles check it.
 */
export const supportsFieldSizing = (): boolean =>
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('field-sizing', 'content');

export interface AutosizeState {
  textarea: HTMLTextAreaElement | null;
  message: string;
  height: number;
}

/**
 * Sets the height of a textarea to its text where the browser can't
 * (`supportsFieldSizing`). Text added at the end can only make it taller:
 * the height is read once and written only when it grows. Any other change
 * resets the height first to measure a shorter text.
 */
export const autosizeTextarea = (
  textarea: HTMLTextAreaElement,
  message: string,
  previous: AutosizeState,
  minHeight: string,
): AutosizeState => {
  const isAppended =
    previous.textarea === textarea && message.startsWith(previous.message);

  if (isAppended) {
    const { scrollHeight } = textarea;
    if (scrollHeight > previous.height) {
      textarea.style.height = `${scrollHeight}px`;
      return { textarea, message, height: scrollHeight };
    }
    return { textarea, message, height: previous.height };
  }

  textarea.style.height = minHeight;
  const { scrollHeight } = textarea;
  textarea.style.height = `${scrollHeight}px`;

  return { textarea, message, height: scrollHeight };
};
