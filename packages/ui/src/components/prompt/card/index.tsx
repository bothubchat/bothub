import React, { useCallback, useState } from 'react';
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
  const [isCopied, setIsCopied] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme();

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocus(false);
    setIsCopied(false);
  }, []);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    onCopy?.(children);
    setIsCopied(true);
  }, [onCopy, children, isCopied]);

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
          <PromptCardCopyIcon as={isFocus ? CheckSmallIcon : CopyIcon} />
        </IconProvider>
        <PromptCardText>{children}</PromptCardText>
      </PromptCardContent>
    </PromptCardStyled>
  );
};
