import { useEffect } from 'react';
import { getTgMarkdown } from './getTgMarkdown';

const INLINE_TAGS = [
  'STRONG',
  'B',
  'EM',
  'I',
  'U',
  'S',
  'STRIKE',
  'DEL',
  'CODE',
  'A',
  'SPAN',
];

export const buildOnCopy = (copyTgMarkdown?: boolean) =>
  function onCopy(e: ClipboardEvent) {
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')
    ) {
      return;
    }

    if (!e.clipboardData) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return;
    }

    const range = selection.getRangeAt(0);

    if (range.collapsed) {
      return;
    }

    let firstSelectedLi: HTMLElement | null = null;
    if (range.startContainer) {
      const startNode =
        range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer.parentElement
          : range.startContainer;
      firstSelectedLi = (startNode as HTMLElement)?.closest?.('li') || null;
    }

    let container = range.commonAncestorContainer;
    if (container.nodeType === Node.TEXT_NODE && container.parentNode) {
      container = container.parentNode;
    }

    const tempDiv = document.createElement('div');
    tempDiv.appendChild(range.cloneContents());

    let htmlContent = tempDiv.innerHTML;

    let wrapperNode = container as HTMLElement | null;

    while (
      wrapperNode &&
      wrapperNode.tagName &&
      wrapperNode.tagName !== 'DIV' &&
      wrapperNode.tagName !== 'P'
    ) {
      if (
        INLINE_TAGS.includes(wrapperNode.tagName) ||
        ['UL', 'OL', 'LI'].includes(wrapperNode.tagName)
      ) {
        const cleanElement = document.createElement(wrapperNode.tagName);

        if (wrapperNode.tagName === 'OL') {
          let startVal = parseInt(wrapperNode.getAttribute('start') || '1', 10);
          if (
            firstSelectedLi &&
            firstSelectedLi.closest('ol') === wrapperNode
          ) {
            let prev = firstSelectedLi.previousElementSibling;
            while (prev) {
              startVal++;
              prev = prev.previousElementSibling;
            }
          }
          cleanElement.setAttribute('start', startVal.toString());
        }

        cleanElement.innerHTML = htmlContent;
        htmlContent = cleanElement.outerHTML;
      }
      wrapperNode = wrapperNode.parentNode as HTMLElement | null;
    }

    tempDiv.innerHTML = htmlContent;

    const elements = tempDiv.getElementsByTagName('*');
    Array.from(elements).forEach((element) => {
      if ('style' in element) {
        const htmlElement = element as HTMLElement;

        htmlElement.removeAttribute('class');
        htmlElement.removeAttribute('style');

        if (htmlElement.tagName === 'TABLE') {
          htmlElement.style.setProperty('border-collapse', 'collapse');
          htmlElement.style.setProperty('border', '1px solid black');
        }
        if (htmlElement.tagName === 'TD' || htmlElement.tagName === 'TH') {
          htmlElement.style.setProperty('border', '1px solid black');
          htmlElement.style.setProperty('padding', '4px');
        }
        if (htmlElement.tagName === 'HR') {
          htmlElement.style.setProperty('width', '100%');
          htmlElement.style.setProperty('height', '1px');
          htmlElement.style.setProperty('background-color', 'black');
        }
        if (htmlElement.tagName === 'LI') {
          htmlElement.style.textAlign = 'start';
          htmlElement.style.textIndent = '-24pt';
          htmlElement.style.paddingLeft = '24pt';
        }
      }
    });

    const finalHtml = tempDiv.innerHTML;
    e.clipboardData.setData('text/html', finalHtml);

    const isInCodeBlock = !!(e.target as HTMLElement)?.closest?.(
      '[data-codeblock="true"]',
    );

    const injectListMarkers = (
      el: HTMLElement,
      isMarkdown: boolean = false,
    ) => {
      const listItems = el.querySelectorAll('li');
      listItems.forEach((li) => {
        let depth = 0;
        let current = li.parentElement;
        while (current && current !== el) {
          if (current.tagName === 'UL' || current.tagName === 'OL') {
            depth++;
          }
          current = current.parentElement;
        }

        const indent = '  '.repeat(Math.max(0, depth - 1));
        let marker = '• ';

        const closestList = li.closest('ul, ol');
        if (closestList?.tagName === 'OL') {
          const items = Array.from(closestList.querySelectorAll('li')).filter(
            (item) => item.closest('ul, ol') === closestList,
          );
          const index = items.indexOf(li);
          const start = parseInt(closestList.getAttribute('start') || '1', 10);

          const dot = isMarkdown ? '\\.' : '.';
          marker = `${start + index}${dot} `;
        }

        li.insertAdjacentText('afterbegin', indent + marker);
      });
    };

    if (copyTgMarkdown && !isInCodeBlock) {
      const markdownDiv = tempDiv.cloneNode(true) as HTMLElement;

      injectListMarkers(markdownDiv, true);

      const formats = [
        { tags: ['STRONG', 'B'], mark: '**' },
        { tags: ['EM', 'I'], mark: '*' },
        { tags: ['S', 'STRIKE', 'DEL'], mark: '~~' },
        { tags: ['CODE'], mark: '`' },
      ];

      formats.forEach(({ tags, mark }) => {
        tags.forEach((tag) => {
          const els = markdownDiv.getElementsByTagName(tag);
          Array.from(els).forEach((el) => {
            el.insertAdjacentText('afterbegin', mark);
            el.insertAdjacentText('beforeend', mark);
          });
        });
      });

      const innerTextWithMarks = markdownDiv.innerText;

      const tgMarkdown = getTgMarkdown(innerTextWithMarks);
      e.clipboardData.setData('text/plain', tgMarkdown);
    } else {
      const plainDiv = tempDiv.cloneNode(true) as HTMLElement;

      injectListMarkers(plainDiv, false);

      const plainText = plainDiv.innerText;
      e.clipboardData.setData('text/plain', plainText);
    }

    e.preventDefault();
  };

export const useMessageCopyHandler = <
  Ref extends React.RefObject<HTMLElement | null>,
>(
  ref: Ref,
  copyTgMarkdown: boolean = true,
): void => {
  useEffect(() => {
    const onCopy = buildOnCopy(copyTgMarkdown);
    const currentRef = ref.current;

    if (currentRef) {
      currentRef.addEventListener('copy', onCopy as EventListener, {
        capture: false,
      });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('copy', onCopy as EventListener, {
          capture: false,
        });
      }
    };
  }, [copyTgMarkdown, ref]);
};
