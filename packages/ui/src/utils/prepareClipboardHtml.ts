export const CLIPBOARD_NORMAL_STYLE = 'font-weight:normal;font-style:normal;';

export const applyClipboardInlineStyles = (root: HTMLElement): void => {
  Array.from(root.getElementsByTagName('*')).forEach((element) => {
    if (!('style' in element)) {
      return;
    }

    const el = element as HTMLElement;

    switch (el.tagName) {
      case 'TABLE':
        el.style.setProperty('font-weight', 'normal');
        break;
      case 'TD':
      case 'PRE':
      case 'P':
      case 'LI':
        el.style.setProperty('font-weight', 'normal');
        el.style.setProperty('font-style', 'normal');
        break;
      case 'TH':
        el.style.setProperty('font-weight', 'bold');
        break;
      default:
        break;
    }
  });
};

export const wrapHtmlForClipboard = (html: string): string =>
  `<div style="${CLIPBOARD_NORMAL_STYLE}">${html}</div>`;

export const prepareClipboardHtml = (html: string): string => {
  const root = document.createElement('div');
  root.innerHTML = html;
  applyClipboardInlineStyles(root);

  return wrapHtmlForClipboard(root.innerHTML);
};
