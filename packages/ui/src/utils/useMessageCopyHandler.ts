import { useEffect } from 'react';
import { getTgMarkdown } from './getTgMarkdown';

const shouldProcessElement = (
  element: Element,
): element is Element & {
  style: HTMLElement['style'];
} => {
  if (!('style' in element)) {
    return false;
  }

  return true;
};

const excludedProperties = [
  'color',
  'background',
  'background-color',
  'font-size',
];

export const buildOnCopy = (copyTgMarkdown?: boolean) =>
  function onCopy(e: ClipboardEvent) {
    if (!e.clipboardData) {
      return;
    }
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return;
    }

    const range = selection.getRangeAt(0);
    let originalElements: HTMLCollectionOf<Element> | null = null;
    // @ts-ignore
    if (range.commonAncestorContainer.getElementsByTagName) {
      originalElements = (
        range.commonAncestorContainer as HTMLElement
      ).getElementsByTagName('*');
    }

    const tempDiv = document.createElement('div');
    tempDiv.appendChild(range.cloneContents());

    const elements = tempDiv.getElementsByTagName('*');
    Array.from(elements).forEach((element, index) => {
      if (shouldProcessElement(element)) {
        const originalElement = originalElements
          ? originalElements[index]
          : null;

        if (originalElement) {
          const computedStyle = window.getComputedStyle(originalElement);
          const preservedStyles: Record<string, string> = {};

          for (const prop of computedStyle) {
            if (!excludedProperties.includes(prop)) {
              const value = computedStyle.getPropertyValue(prop);
              if (value) {
                preservedStyles[prop] = value;
              }
            }
          }

          for (const [prop, value] of Object.entries(preservedStyles)) {
            element.style.setProperty(prop, value);
          }
        }

        element.style.removeProperty('color');
        element.style.removeProperty('background');
        element.style.removeProperty('background-color');
        element.removeAttribute('class');

        if (element.tagName === 'TABLE') {
          element.style.setProperty('border-collapse', 'collapse');
          element.style.setProperty('border', '1px solid black');
        }
        if (element.tagName === 'TD' || element.tagName === 'TH') {
          element.style.setProperty('border', '1px solid black');
          element.style.setProperty('padding', '4px');
        }
        if (element.tagName === 'HR') {
          element.style.setProperty('width', '100%');
          element.style.setProperty('height', '1px');
          element.style.setProperty('background-color', 'black');
        }
        if (element.tagName === 'LI') {
          element.style.textAlign = 'start';
          element.style.textIndent = '-24pt';
          element.style.paddingLeft = '24pt';
        }
      }
    });

    // @ts-expect-error
    const isInCodeBlock = !!e.target?.closest('[data-codeblock="true"]');

    e.clipboardData.setData('text/html', tempDiv.innerHTML);
    if (copyTgMarkdown && !isInCodeBlock) {
      const tgMarkdown = getTgMarkdown(tempDiv.innerText);
      e.clipboardData.setData('text/plain', tgMarkdown);
    } else {
      e.clipboardData.setData('text/plain', tempDiv.innerText);
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
  };

export const useMessageCopyHandler = <
  Ref extends React.RefObject<HTMLElement | null>,
>(
  ref: Ref,
  copyTgMarkdown: boolean = true,
): void => {
  useEffect(() => {
    const onCopy = buildOnCopy(copyTgMarkdown);
    ref.current?.addEventListener('copy', onCopy, {
      capture: false, // listen bubbling phase
    });

    return () => {
      ref.current?.removeEventListener('copy', onCopy, {
        capture: false,
      });
    };
  }, [copyTgMarkdown]);
};
