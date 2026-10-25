import React, { useCallback, useState } from 'react';
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

  const [isCopied, setIsCopied] = useState(false);

  const handleBlur = useCallback(() => {
    setIsCopied(false);
  }, []);

  const handleClick = useCallback(() => {
    if (isCopied) {
      return;
    }

    onCopy?.(children);
    setIsCopied(true);
  }, [isCopied, children, onCopy]);

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
