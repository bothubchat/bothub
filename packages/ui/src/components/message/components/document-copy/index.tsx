import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  MessageDocumentContentBlock,
  MessageDocumentContentBlockTop,
  MessageDocumentCopyButton,
} from './styled';
import { processSelection } from '@/ui/utils';

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

    const range = document.createRange();
    range.selectNodeContents(contentRef.current);

    const { html, plain } = processSelection(range, !!isTg, !isTg);

    try {
      const clipboardItems: Record<string, Blob> = {};

      if (plain) {
        clipboardItems['text/plain'] = new Blob([plain], {
          type: 'text/plain',
        });
      }
      if (html) {
        clipboardItems['text/html'] = new Blob([html], { type: 'text/html' });
      }

      await navigator.clipboard.write([new ClipboardItem(clipboardItems)]);

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
