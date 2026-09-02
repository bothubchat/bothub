import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCopied(true);
    if (typeof code === 'string') {
      onCodeCopy?.(code);
    }

    timeoutRef.current = setTimeout(() => setIsCopied(false), 1000);
  }, [isCopied, code, onCodeCopy]);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
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
