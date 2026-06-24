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

export const processSelection = (
  range: Range,
  copyTgMarkdown: boolean,
  isInCodeBlock: boolean,
): { html: string; plain: string } => {
  let firstSelectedLi: HTMLElement | null = null;
  let isSingleLi = false;
  let isAtStartOfLi = false;

  if (range.startContainer) {
    const startNode =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement
        : range.startContainer;
    firstSelectedLi = (startNode as HTMLElement)?.closest?.('li') || null;

    if (firstSelectedLi) {
      const commonAncestor = range.commonAncestorContainer;
      const ancestorElement =
        commonAncestor.nodeType === Node.TEXT_NODE
          ? commonAncestor.parentElement
          : (commonAncestor as HTMLElement);

      isSingleLi = ancestorElement?.closest('li') === firstSelectedLi;

      const tempRange = document.createRange();
      tempRange.selectNodeContents(firstSelectedLi);
      tempRange.setEnd(range.startContainer, range.startOffset);
      if (tempRange.toString().trim().length === 0) {
        isAtStartOfLi = true;
      }
    }
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
    const isListTag = ['UL', 'OL', 'LI'].includes(wrapperNode.tagName);
    const shouldWrapList = isListTag && !(isSingleLi && !isAtStartOfLi);

    if (INLINE_TAGS.includes(wrapperNode.tagName) || shouldWrapList) {
      const cleanElement = document.createElement(wrapperNode.tagName);

      if (wrapperNode.tagName === 'OL') {
        let startVal = parseInt(wrapperNode.getAttribute('start') || '1', 10);
        if (firstSelectedLi && firstSelectedLi.closest('ol') === wrapperNode) {
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

  const injectListMarkers = (el: HTMLElement, isMarkdown: boolean = false) => {
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

  let plainText = '';

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

    plainText = getTgMarkdown(markdownDiv.innerText);
  } else {
    const plainDiv = tempDiv.cloneNode(true) as HTMLElement;
    injectListMarkers(plainDiv, false);
    plainText = plainDiv.innerText;
  }

  return { html: finalHtml, plain: plainText };
};
