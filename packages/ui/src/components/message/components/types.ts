import { MessageCodeProps } from './code';
import { MessageParagraphProps } from './paragraph';
import { MessagePreProps } from './pre';
import { MessageStrongProps } from './strong';

export interface MessageComponentsProps {
  code?: Partial<MessageCodeProps>;
  paragraph?: Partial<MessageParagraphProps>;
  pre?: Partial<MessagePreProps>;
  strong?: Partial<MessageStrongProps>;
}
