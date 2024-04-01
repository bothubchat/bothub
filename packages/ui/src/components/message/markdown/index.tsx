import {
  useCallback, useMemo, useState 
} from 'react';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { useMessage } from '@/ui/components/message/context';
import {
  MessageBold,
  MessageComponentsProps, 
  MessageImage, 
  MessageInlineCode, 
  MessageItalic, 
  MessageLink, 
  MessageList, 
  MessageListItem,
  MessageMultilineCode, 
  MessageParagraph, 
  MessagePre,
  MessageTable,
  MessageTableBody,
  MessageTableCell,
  MessageTableHead,
  MessageTableRow,
  MessageTitle 
} from '@/ui/components/message/components';
import { MessageMarkdownLine, MessageMarkdownStyled } from './styled';

export interface MessageMarkdownProps {
  children: string;
  components?: MessageComponentsProps;
}

export const MessageMarkdown: React.FC<MessageMarkdownProps> = ({
  children,
  components = {}
}) => {
  const { typing, variant, color } = useMessage();
  const isDisabled = variant === 'user';
  
  const [rehypeError, setRehypeError] = useState<string | null>(null);
  
  const formattedChildren = useMemo(() => {
    if (typeof children === 'string' && !isDisabled) {
      return children.replace(/\\\[((.|[\r\n])*?)\\\]/g, (_, content) => `$$${content}$$`)
        .replace(/\\\(((.|[\r\n])*?)\\\)/g, (_, content) => `$${content}$`);
    }
    return children;
  }, [children, isDisabled]);
  
  const handleKatexStrict = useCallback((errorCode: string) => {
    if (errorCode !== 'htmlExtension') {
      queueMicrotask(() => setRehypeError(errorCode));
    }
  }, []);

  const markdownNode = useMemo(() => {
    const lines = children.split('\n\n');
    const parsedLines: string[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
      if (line !== '```' && line.startsWith('```') && line.endsWith('```')) {
        parsedLines.push(line);
      } else if (line.startsWith('```') || line.endsWith('```')) {
        inCodeBlock = !inCodeBlock;

        if (inCodeBlock) {
          parsedLines.push(`${line}\n\n`);
        }
      } else if (inCodeBlock) {
        parsedLines[parsedLines.length - 1] += `${line}\n\n`;
      } else {
        parsedLines.push(line);
      }
    }

    return (
      <MessageMarkdownStyled>
        {parsedLines.map((chunk, index) => (
          <MessageMarkdownLine
            $typing={typing}
            $color={color}
            key={index}
            remarkPlugins={[remarkGfm, remarkMath]}
            // @ts-ignore
            rehypePlugins={[
              ...(!rehypeError ? [
                () => rehypeKatex({ strict: handleKatexStrict })
              ] : []),
            ]}
            components={{
              p: ({ children }) => (
                <MessageParagraph>
                  {children}
                </MessageParagraph>
              ),
              b: ({ children }) => (
                <MessageBold>
                  {children}
                </MessageBold>
              ),
              strong: ({ children }) => (
                <MessageBold
                  component="strong"
                >
                  {children}
                </MessageBold>
              ),
              i: ({ children }) => (
                <MessageItalic>
                  {children}
                </MessageItalic>
              ),
              em: ({ children }) => (
                <MessageItalic
                  component="em"
                >
                  {children}
                </MessageItalic>
              ),
              pre: ({ children }) => (
                <MessagePre>
                  {children}
                </MessagePre>
              ),
              code: ({ className, inline = false, children }) => {
                const code = String(children);
                if (!code) {
                  return null;
                }
  
                if (inline) {
                  return (
                    <MessageInlineCode>
                      {code}
                    </MessageInlineCode>
                  );
                }
    
                return (
                  <MessageMultilineCode
                    {...components.code}
                    className={className}
                  >
                    {code}
                  </MessageMultilineCode>
                );
              },
              table: ({ children }) => (
                <MessageTable>
                  {children}
                </MessageTable>
              ),
              thead: ({ children }) => (
                <MessageTableHead>
                  {children}
                </MessageTableHead>
              ),
              tbody: ({ children }) => (
                <MessageTableBody>
                  {children}
                </MessageTableBody>
              ),
              tr: ({ children }) => (
                <MessageTableRow>
                  {children}
                </MessageTableRow>
              ),
              td: ({ children }) => (
                <MessageTableCell>
                  {children}
                </MessageTableCell>
              ),
              th: ({ children }) => (
                <MessageTableCell
                  head
                >
                  {children}
                </MessageTableCell>
              ),
              ul: ({ children }) => (
                <MessageList>
                  {children}
                </MessageList>
              ),
              ol: ({ start, children }) => (
                <MessageList
                  variant="number"
                  start={start}
                >
                  {children}
                </MessageList>
              ),
              li: ({ children }) => (
                <MessageListItem>
                  {children}
                </MessageListItem>
              ),
              h1: ({ children }) => (
                <MessageTitle
                  variant="h1"
                >
                  {children}
                </MessageTitle>
              ),
              h2: ({ children }) => (
                <MessageTitle
                  variant="h2"
                >
                  {children}
                </MessageTitle>
              ),
              h3: ({ children }) => (
                <MessageTitle
                  variant="h3"
                >
                  {children}
                </MessageTitle>
              ),
              h4: ({ children }) => (
                <MessageTitle
                  variant="h4"
                >
                  {children}
                </MessageTitle>
              ),
              h5: ({ children }) => (
                <MessageTitle
                  variant="h5"
                >
                  {children}
                </MessageTitle>
              ),
              h6: ({ children }) => (
                <MessageTitle
                  variant="h6"
                >
                  {children}
                </MessageTitle>
              ),
              a: ({ href, children }) => (
                <MessageLink
                  href={href}
                  target="_blank"
                >
                  {children}
                </MessageLink>
              ),
              img: ({
                src, width, height, alt 
              }) => {
                if (!src || !width || !height) {
                  return null;
                }
  
                return (
                  <MessageImage
                    src={src}
                    width={Number.parseInt(width.toString())}
                    height={Number.parseInt(height.toString())}
                    alt={alt}
                  />
                );
              }
            }}
          >
            {chunk}
          </MessageMarkdownLine>
        ))}
      </MessageMarkdownStyled>
    );
  }, [typing, children]);

  return (
    <>
      {(isDisabled && typeof children === 'string') && (
        <MessageParagraph
          wrap
          disableMargin
        >
          {formattedChildren}
        </MessageParagraph>
      )}
      {(!isDisabled && typeof children === 'string') && markdownNode}
    </>
  );
};
