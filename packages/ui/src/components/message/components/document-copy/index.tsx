import { memo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  MessageDocumentContentBlock,
  MessageDocumentContentBlockTop,
  MessageDocumentCopyButton,
} from './styled';
import { processSelection } from '@/ui/utils';
import { useCopiedState } from '@/ui/utils/useCopiedState';

interface GeneratedDocumentBlockProps {
  code: string;
  copyLabel?: string;
  remarkPlugins?: React.ComponentProps<typeof ReactMarkdown>['remarkPlugins'];
  rehypePlugins?: React.ComponentProps<typeof ReactMarkdown>['rehypePlugins'];
  baseComponents?: React.ComponentProps<typeof ReactMarkdown>['components'];
  isTg?: boolean;
}

const GeneratedDocumentBlockComponent = ({
  code,
  copyLabel,
  remarkPlugins,
  rehypePlugins,
  baseComponents,
  isTg,
}: GeneratedDocumentBlockProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { copied, markCopied } = useCopiedState(2000);

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

      markCopied();
    } catch (err) {
      navigator.clipboard
        .writeText(contentRef.current.innerText)
        .catch(() => {});
    }
  };

  return (
    <MessageDocumentContentBlock>
      <MessageDocumentContentBlockTop>
        <MessageDocumentCopyButton
          type="button"
          onClick={handleCopy}
        >
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

// The block renders its own markdown: it is parsed again only when its props
// change, not on every chunk streamed after it.
export const GeneratedDocumentBlock = memo(GeneratedDocumentBlockComponent);
