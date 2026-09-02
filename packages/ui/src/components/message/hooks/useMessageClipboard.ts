import { useCallback, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { getTgMarkdown } from '@/ui/utils';
import { MessageCopyEventHandler } from '../types';

type UseMessageClipboardProps = {
  content?: string;
  onCopy?: MessageCopyEventHandler;
};

export function useMessageClipboard({
  content,
  onCopy,
}: UseMessageClipboardProps) {
  const messageBlockContentRef = useRef<HTMLDivElement | null>(null);
  const messageTextRef = useRef<string | null>(null);

  const getRichText = useCallback(async () => {
    const htmlContent = (await marked.parse(messageTextRef.current!)).replace(
      /<p>([\s\S]*?)<\/p>/g,
      '<pre>$1</pre>',
    );

    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([messageTextRef.current!], { type: 'text/plain' }),
      'text/html': new Blob([htmlContent], { type: 'text/html' }),
    });

    return [clipboardItem];
  }, []);

  const getPlainText = useCallback((html: HTMLElement) => {
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([html.innerText.replace(/\n{3,}/g, '\n\n')], {
        type: 'text/plain',
      }),
    });

    return [clipboardItem];
  }, []);

  const getTgText = useCallback((text: string) => {
    const tgMarkdown = getTgMarkdown(text);

    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([tgMarkdown], { type: 'text/plain' }),
    });

    return [clipboardItem];
  }, []);

  const handlePlainTextCopy = useCallback(() => {
    if (messageBlockContentRef.current) {
      return onCopy?.(getPlainText(messageBlockContentRef.current));
    }
  }, [getPlainText, onCopy]);

  const handleTgTextCopy = useCallback(() => {
    if (messageTextRef.current) {
      return onCopy?.(getTgText(messageTextRef.current));
    }
  }, [getTgText, onCopy]);

  const handleRichTextCopy = useCallback(async () => {
    if (messageTextRef.current) {
      return onCopy?.(await getRichText());
    }
  }, [getRichText, onCopy]);

  useEffect(() => {
    if (!content) {
      return;
    }

    messageTextRef.current = content;
  }, [content]);

  return {
    messageBlockContentRef,
    handlePlainTextCopy,
    handleTgTextCopy,
    handleRichTextCopy,
  };
}
