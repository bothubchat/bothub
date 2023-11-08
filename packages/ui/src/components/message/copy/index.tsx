import React, { useCallback, useState } from 'react';
import { MessageAction } from '../styled';
import { useMessage } from '../context';
import { CheckSmallIcon, CopyIcon } from '@/ui/icons';
import { MessageCopyActionStyled } from './styled';

export type MessageCopyActionProps = React.ComponentProps<typeof MessageAction>;

export const MessageCopyAction: React.FC<MessageCopyActionProps> = ({
  ...props
}) => {
  const { message, onCopy } = useMessage();

  const [isFocus, setIsFocus] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    if (typeof message === 'string') {
      onCopy?.(message);
    }

    setIsFocus(true);
    setIsCopied(true);
  }, [isCopied, message, onCopy]);

  const handleBlur = useCallback(() => {
    setIsFocus(false);
    setIsCopied(false);
  }, []);

  return (
    <MessageCopyActionStyled
      {...props}
      $focus={isFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {!isFocus && (
        <CopyIcon />
      )}
      {isFocus && (
        <CheckSmallIcon />
      )}
    </MessageCopyActionStyled>
  );
};
