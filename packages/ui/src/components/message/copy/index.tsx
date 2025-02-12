import React, { useCallback, useState } from 'react';
import { MessageAction } from '../styled';
import { useMessage } from '../context';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CopyIcon } from '@/ui/icons/copy';
import { MessageCopyActionStyled } from './styled';

export type MessageCopyActionProps = React.ComponentProps<typeof MessageAction>;

export const MessageCopyAction: React.FC<MessageCopyActionProps> = ({
  ...props
}) => {
  const { onCopy } = useMessage();

  const [isFocus, setIsFocus] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    onCopy?.();

    setIsFocus(true);
    setIsCopied(true);
  }, [isCopied, onCopy]);

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
      {!isFocus && <CopyIcon />}
      {isFocus && <CheckSmallIcon />}
    </MessageCopyActionStyled>
  );
};
