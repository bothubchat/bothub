import React, { useCallback, useState } from 'react';
import { useCopiedState } from '@/ui/utils/useCopiedState';
import {
  PromptCardContent,
  PromptCardCopyIcon,
  PromptCardStyled,
  PromptCardText,
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CopyIcon } from '@/ui/icons/copy';

export type PromptCardCopyEventHandler = (prompt: string) => unknown;

export interface PromptCardProps {
  className?: string;
  tabIndex?: number;
  children: string;
  onCopy?: PromptCardCopyEventHandler;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  className,
  tabIndex = 0,
  children,
  onCopy,
}) => {
  const { copied: isCopied, markCopied, resetCopied } = useCopiedState();
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme();

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocus(false);
    resetCopied();
  }, [resetCopied]);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    onCopy?.(children);
    markCopied();
  }, [onCopy, children, isCopied, markCopied]);

  return (
    <PromptCardStyled
      className={className}
      tabIndex={tabIndex}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      <PromptCardContent>
        <IconProvider
          size={24}
          fill={
            isFocus ? theme.colors.accent.primaryLight : theme.colors.base.white
          }
        >
          <PromptCardCopyIcon as={isCopied ? CheckSmallIcon : CopyIcon} />
        </IconProvider>
        <PromptCardText>{children}</PromptCardText>
      </PromptCardContent>
    </PromptCardStyled>
  );
};
