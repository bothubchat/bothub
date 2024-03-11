import React from 'react';
import { 
  MessageMultilineCodeBody,
  MessageMultilineCodeContent,
  MessageMultilineCodeHead, 
  MessageMultilineCodeLanguage, 
  MessageMultilineCodeStyled
} from './styled';
import { Tooltip } from '@/ui/components/tooltip';
import { MessageMultilineCodeCopyButton } from './copy';
import { useMessage } from '../../../context';

export interface MessageMultilineCodeProps {
  className?: string;
  copyLabel?: string;
  children: string;
}

export const MessageMultilineCode: React.FC<MessageMultilineCodeProps> = ({ 
  className,
  copyLabel,
  children
}) => {
  const { variant, color } = useMessage();

  const classNameRegexp = /language-(\w+)/;
  const classNameMatch = classNameRegexp.exec(className || '');
  const languageName: string = className?.replace(classNameRegexp, '$1') ?? 'text';
  const codeClassName: string = classNameMatch ? classNameMatch[1] : '';

  return (
    <MessageMultilineCodeStyled>
      <MessageMultilineCodeHead
        $messageVariant={variant}
        $messageColor={color}
      >
        <MessageMultilineCodeLanguage
          $messageVariant={variant}
          $messageColor={color}
        >
          {languageName}
        </MessageMultilineCodeLanguage>
        <Tooltip 
          variant="secondary"
          label={copyLabel}
        >
          <MessageMultilineCodeCopyButton
            code={children}
            messageVariant={variant}
            messageColor={color}
          />
        </Tooltip>
      </MessageMultilineCodeHead>
      <MessageMultilineCodeBody>
        <MessageMultilineCodeContent
          $messageColor={color}
          className={codeClassName}
        >
          {children}
        </MessageMultilineCodeContent>
      </MessageMultilineCodeBody>
    </MessageMultilineCodeStyled>
  );
};

export * from './styled';
