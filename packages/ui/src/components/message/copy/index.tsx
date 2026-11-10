import React, { useCallback, useState } from 'react';
import { MessageAction } from '../styled';
import { useMessage } from '../context';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CopyIcon } from '@/ui/icons/copy';
import { useCopiedState } from '@/ui/utils/useCopiedState';
import { MessageCopyActionStyled } from './styled';

export type MessageCopyActionProps = React.ComponentProps<typeof MessageAction>;

export const MessageCopyAction: React.FC<MessageCopyActionProps> = ({
  ...props
}) => {
  const { onCopy } = useMessage();

  const [isFocus, setIsFocus] = useState(false);
  const { copied: isCopied, markCopied, resetCopied } = useCopiedState();

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    onCopy?.();

    setIsFocus(true);
    markCopied();
  }, [isCopied, onCopy, markCopied]);

  const handleBlur = useCallback(() => {
    setIsFocus(false);
    resetCopied();
  }, [resetCopied]);

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
