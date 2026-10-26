import React, { useCallback } from 'react';
import { useCopiedState } from '@/ui/utils/useCopiedState';
import {
  ReferralCardLinkCopyIcon,
  ReferralCardLinkStyled,
  ReferralCardLinkText,
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CopyIcon } from '@/ui/icons/copy';

export type ReferralCardLinkCopyEventHandler = (link: string) => unknown;

export interface ReferralCardLinkProps {
  className?: string;
  tabIndex?: number;
  children: string;
  onCopy?: ReferralCardLinkCopyEventHandler;
}

export const ReferralCardLink: React.FC<ReferralCardLinkProps> = ({
  className,
  tabIndex = 0,
  children,
  onCopy,
}) => {
  const theme = useTheme();

  const { copied: isCopied, markCopied, resetCopied } = useCopiedState();

  const handleBlur = resetCopied;

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    onCopy?.(children);
    markCopied();
  }, [isCopied, children, onCopy, markCopied]);

  return (
    <IconProvider
      size={18}
      fill={theme.colors.accent.primary}
    >
      <ReferralCardLinkStyled
        className={className}
        tabIndex={tabIndex}
        onBlur={handleBlur}
        onClick={handleClick}
      >
        <ReferralCardLinkText>{children}</ReferralCardLinkText>
        <ReferralCardLinkCopyIcon as={isCopied ? CheckSmallIcon : CopyIcon} />
      </ReferralCardLinkStyled>
    </IconProvider>
  );
};
