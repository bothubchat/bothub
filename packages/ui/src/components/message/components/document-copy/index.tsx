import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  MessageDocumentContentBlock,
  MessageDocumentContentBlockTop,
  MessageDocumentCopyButton,
} from './styled';

interface GeneratedDocumentBlockProps {
  code: string;
  copyLabel?: string;
  remarkPlugins?: React.ComponentProps<typeof ReactMarkdown>['remarkPlugins'];
  rehypePlugins?: React.ComponentProps<typeof ReactMarkdown>['rehypePlugins'];
  baseComponents?: React.ComponentProps<typeof ReactMarkdown>['components'];
  isTg?: boolean;
}

export const GeneratedDocumentBlock = ({
  code,
  copyLabel,
  remarkPlugins,
  rehypePlugins,
  baseComponents,
  isTg,
}: GeneratedDocumentBlockProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!contentRef.current) return;

    const selection = window.getSelection();
    const originalRange =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    const range = document.createRange();
    range.selectNodeContents(contentRef.current);
    selection?.removeAllRanges();
    selection?.addRange(range);

    const dt = new DataTransfer();
    const copyEvent = new ClipboardEvent('copy', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    try {
      contentRef.current.dispatchEvent(copyEvent);
    } finally {
      selection?.removeAllRanges();
      if (originalRange) {
        selection?.addRange(originalRange);
      }
    }

    try {
      const html = dt.getData('text/html');
      const plain = dt.getData('text/plain');

      if (html || plain) {
        const clipboardItems: Record<string, Blob> = {};
        if (plain)
          clipboardItems['text/plain'] = new Blob([plain], {
            type: 'text/plain',
          });
        if (html)
          clipboardItems['text/html'] = new Blob([html], { type: 'text/html' });

        await navigator.clipboard.write([new ClipboardItem(clipboardItems)]);
      } else {
        await navigator.clipboard.writeText(contentRef.current.innerText);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      navigator.clipboard
        .writeText(contentRef.current.innerText)
        .catch(() => {});
    }
  };

  return (
    <MessageDocumentContentBlock>
      <MessageDocumentContentBlockTop>
        <MessageDocumentCopyButton onClick={handleCopy}>
          {copied ? '✓' : copyLabel || 'Copy'}
        </MessageDocumentCopyButton>
      </MessageDocumentContentBlockTop>

      <div
        className="ai-generated-document-content"
        ref={contentRef}
        data-codeblock={isTg ? undefined : 'true'}
      >
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          components={baseComponents}
        >
          {code}
        </ReactMarkdown>
      </div>
    </MessageDocumentContentBlock>
  );
};
