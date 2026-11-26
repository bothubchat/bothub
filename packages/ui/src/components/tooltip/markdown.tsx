import ReactMarkdown, { type Components } from 'react-markdown';
import { TooltipCode, TooltipLabel, TooltipLabelBold } from './styled';

/*
 * The markdown chunk of tooltips, loaded by `loadTooltipMarkdown` only when a
 * tooltip with `markdown` mounts.
 */

const markdownComponents: Components = {
  p: ({ children }) => <TooltipLabel component="p">{children}</TooltipLabel>,
  b: ({ children }) => <TooltipLabelBold>{children}</TooltipLabelBold>,
  strong: ({ children }) => (
    <TooltipLabelBold component="strong">{children}</TooltipLabelBold>
  ),
  code: ({ children }) => <TooltipCode>{children}</TooltipCode>,
};

export interface TooltipMarkdownContentProps {
  children: string;
}

export const TooltipMarkdownContent: React.FC<TooltipMarkdownContentProps> = ({
  children,
}) => <ReactMarkdown components={markdownComponents}>{children}</ReactMarkdown>;
