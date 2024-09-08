import { MessageMultilineCodeProps } from './code/multiline';
import { MessageImageProps } from './image';

export interface MessageComponentsProps {
  code?: Partial<MessageMultilineCodeProps>;
  image?: Omit<Partial<MessageImageProps>, 'buttons'> & {
    buttons?: (imageProps: MessageImageProps) => React.ReactNode;
  };
}
