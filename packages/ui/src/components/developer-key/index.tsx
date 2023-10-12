import React, { useCallback, useState } from 'react';
import { DeveloperKeyCopyIcon, DeveloperKeyStyled, DeveloperKeyValue } from './styled';
import { useTheme } from '@/ui/theme';
import { IconProvider } from '@/ui/components/icon';
import { CheckSmallIcon, CopyIcon } from '@/ui/icons';
import { Skeleton } from '@/ui/components/skeleton';

export type DeveloperKeyCopyEventHandler = (key: string) => unknown;

export interface DeveloperKeyProps {
  className?: string;
  tabIndex?: number;
  children?: string;
  skeleton?: boolean;
  onCopy?: DeveloperKeyCopyEventHandler;
}

export const DeveloperKey: React.FC<DeveloperKeyProps> = ({
  className, tabIndex = 0, skeleton = false, children, onCopy
}) => {
  const theme = useTheme();

  const [isFocus, setIsFocus] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFocus = useCallback(() => {
    if (skeleton) {
      return;
    }
    
    setIsFocus(true);
  }, [skeleton]);
  const handleBlur = useCallback(() => {
    setIsFocus(false);
    setIsCopied(false);
  }, []);

  const handleClick = useCallback(() => {
    if (skeleton || isCopied) {
      return;
    }

    if (typeof children === 'string') {
      onCopy?.(children);
    }
    setIsCopied(true);
  }, [skeleton, isCopied, children, onCopy]);

  return (
    <IconProvider
      size={18}
      fill={isFocus ? theme.colors.accent.primaryLight : theme.colors.grayScale.gray1}
    >
      <DeveloperKeyStyled
        $skeleton={skeleton}
        className={className}
        tabIndex={tabIndex}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
      >
        {!skeleton && (
          <DeveloperKeyValue>
            {children}
          </DeveloperKeyValue>
        )}
        {skeleton && (
          <DeveloperKeyValue>
            <Skeleton fullWidth />
          </DeveloperKeyValue>
        )}
        <DeveloperKeyCopyIcon 
          as={isFocus ? CheckSmallIcon : CopyIcon}
        />
      </DeveloperKeyStyled>
    </IconProvider>
  );
};
