import React, { useCallback, useState } from 'react';
import { MessageVariant } from '../../../types';
import { MessageCodeCopyButtonStyled } from './styled';
import { useMessage } from '../../../context';
import { CheckSmallIcon, CopyIcon } from '@/ui/icons';

export interface MessageCodeCopyButtonProps {
  code: string;
  messageVariant: MessageVariant;
}

export const MessageCodeCopyButton: React.FC<MessageCodeCopyButtonProps> = ({
  code, messageVariant
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
    <MessageCodeCopyButtonStyled
      $focus={isFocus}
      $messageVariant={messageVariant}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {!isFocus && (
        <CopyIcon />
      )}
      {isFocus && (
        <CheckSmallIcon />
      )}
    </MessageCodeCopyButtonStyled>
  );
};
