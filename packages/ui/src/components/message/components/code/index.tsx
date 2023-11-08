import React from 'react';
import { 
  MessageCodeBody,
  MessageCodeContent,
  MessageCodeHead, 
  MessageCodeLanguage, 
  MessageMultilineCode, 
  MessageUnlineCode
} from './styled';
import { MessageVariant } from '@/ui/components/message';
import { MessageCodeVariant } from './types';
import { Tooltip } from '@/ui/components/tooltip';
import { MessageCodeCopyButton } from './copy';

export interface MessageCodeProps {
  className?: string;
  variant?: MessageCodeVariant;
  messageVariant?: MessageVariant;
  copyLabel?: string;
  children: string;
}

export const MessageCode: React.FC<MessageCodeProps> = ({ 
  className,
  variant = 'multiline',
  messageVariant = 'user',
  copyLabel,
  children
}) => {
  const classNameRegexp = /language-(\w+)/;
  const classNameMatch = classNameRegexp.exec(className || '');
  const languageName: string = className?.replace(classNameRegexp, '$1') ?? 'text';
  const codeClassName: string = classNameMatch ? classNameMatch[1] : '';

  switch (variant) {
    case 'multiline':
      return (
        <MessageMultilineCode>
          <MessageCodeHead
            $messageVariant={messageVariant}
          >
            <MessageCodeLanguage
              $messageVariant={messageVariant}
            >
              {languageName}
            </MessageCodeLanguage>
            <Tooltip 
              variant="secondary"
              label={copyLabel}
            >
              <MessageCodeCopyButton
                code={children}
                messageVariant={messageVariant}
              />
            </Tooltip>
          </MessageCodeHead>
          <MessageCodeBody>
            <MessageCodeContent className={codeClassName}>
              {children}
            </MessageCodeContent>
          </MessageCodeBody>
        </MessageMultilineCode>
      );
    case 'inline':
      return (
        <MessageUnlineCode
          $messageVariant={messageVariant}
        >
          {children}
        </MessageUnlineCode>
      );
  }
};

export * from './types';
export * from './styled';
