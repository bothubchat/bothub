import React, { useCallback, useState } from 'react';
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

export const MessageMultilineCodeCopyButton: React.FC<MessageMultilineCodeCopyButtonProps> = ({
  code, messageVariant, messageColor
}) => {
  const { onCodeCopy } = useMessage();

  const [isFocus, setIsFocus] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    if (typeof code === 'string') {
      onCodeCopy?.(code);
    }

    setIsFocus(true);
    setIsCopied(true);
  }, [isCopied, code, onCodeCopy]);

  const handleBlur = useCallback(() => {
    setIsFocus(false);
    setIsCopied(false);
  }, []);

  return (
    <MessageMultilineCodeCopyButtonStyled
      $focus={isFocus}
      $messageVariant={messageVariant}
      $messageColor={messageColor}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {!isFocus && (
        <CopyIcon />
      )}
      {isFocus && (
        <CheckSmallIcon />
      )}
    </MessageMultilineCodeCopyButtonStyled>
  );
};
