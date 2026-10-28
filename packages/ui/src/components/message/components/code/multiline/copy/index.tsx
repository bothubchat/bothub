import React, { useCallback } from 'react';
import { MessageMultilineCodeCopyButtonStyled } from './styled';
import { useMessage } from '@/ui/components/message/context';
import { MessageVariant } from '@/ui/components/message/types';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CopyIcon } from '@/ui/icons/copy';
import { useCopiedState } from '@/ui/utils/useCopiedState';

export interface MessageMultilineCodeCopyButtonProps {
  code: string;
  messageVariant: MessageVariant;
  messageColor: string;
}

export const MessageMultilineCodeCopyButton: React.FC<
  MessageMultilineCodeCopyButtonProps
> = ({ code, messageVariant, messageColor }) => {
  const { onCodeCopy } = useMessage();

  const { copied: isCopied, markCopied } = useCopiedState(1000);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    markCopied();
    if (typeof code === 'string') {
      onCodeCopy?.(code);
    }
  }, [isCopied, code, onCodeCopy, markCopied]);

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
