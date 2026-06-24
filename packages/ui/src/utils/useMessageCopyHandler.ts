import { useEffect } from 'react';
import { processSelection } from './processSelection';

export const buildOnCopy = (
  copyTgMarkdown: boolean = true,
  preserveFormatting: boolean = true,
) =>
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

    if (!preserveFormatting) {
      e.clipboardData.setData('text/plain', selection.toString());
      e.preventDefault();
      return;
    }

    const range = selection.getRangeAt(0);

    if (range.collapsed) {
      return;
    }

    const isInCodeBlock = !!(e.target as HTMLElement)?.closest?.(
      '[data-codeblock="true"]',
    );

    const { html, plain } = processSelection(
      range,
      copyTgMarkdown,
      isInCodeBlock,
    );

    e.clipboardData.setData('text/html', html);
    e.clipboardData.setData('text/plain', plain);

    e.preventDefault();
  };

export const useMessageCopyHandler = <
  Ref extends React.RefObject<HTMLElement | null>,
>(
  ref: Ref,
  copyTgMarkdown: boolean = true,
  preserveFormatting: boolean = false,
): void => {
  useEffect(() => {
    const onCopy = buildOnCopy(copyTgMarkdown, preserveFormatting);
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
  }, [copyTgMarkdown, preserveFormatting, ref]);
};
