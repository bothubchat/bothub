import React, { useCallback, useEffect, useState } from 'react';
import { MessageMultilineCodeCopyButtonStyled } from './styled';
import { useMessage } from '@/ui/components/message/context';
import { MessageVariant } from '@/ui/components/message/types';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CopyIcon } from '@/ui/icons/copy';

export interface MessageMultilineCodeCopyButtonProps {
  code: string;
  messageVariant: MessageVariant;
  messageColor: string;
}

export const MessageMultilineCodeCopyButton: React.FC<
  MessageMultilineCodeCopyButtonProps
> = ({ code, messageVariant, messageColor }) => {
  const { onCodeCopy } = useMessage();

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsCopied(true);
    if (typeof code === 'string') {
      onCodeCopy?.(code);
    }

    setTimeoutId(setTimeout(() => setIsCopied(false), 1000));
  }, [isCopied, code, onCodeCopy]);

  useEffect(
    () => () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },
    [],
  );

  return (
    <MessageMultilineCodeCopyButtonStyled
      $focus={isCopied}
      $messageVariant={messageVariant}
      $messageColor={messageColor}
      onClick={handleClick}
    >
      {!isCopied && <CopyIcon />}
      {isCopied && <CheckSmallIcon />}
    </MessageMultilineCodeCopyButtonStyled>
  );
};
