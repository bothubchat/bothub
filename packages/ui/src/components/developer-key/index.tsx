import React, { useCallback, useState } from 'react';
import {
  DeveloperKeyContent,
  DeveloperKeyCopyIcon,
  DeveloperKeyDeleteButton,
  DeveloperKeyDeleteIcon,
  DeveloperKeyLabel,
  DeveloperKeyStyled,
  DeveloperKeyValue,
  DeveloperKeyWrapper,
} from './styled';
import { useTheme } from '@/ui/theme';
import { IconProvider } from '@/ui/components/icon';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CopyIcon } from '@/ui/icons/copy';
import { Skeleton } from '@/ui/components/skeleton';

export type DeveloperKeyCopyEventHandler = (key: string) => unknown;
export type DeveloperKeyDeleteEventHandler = (key: string | null) => unknown;

export interface DeveloperKeyProps {
  id: string;
  className?: string;
  tabIndex?: number;
  label?: string;
  children?: string;
  skeleton?: boolean;
  onCopy?: DeveloperKeyCopyEventHandler;
  onDelete?: DeveloperKeyDeleteEventHandler;
}

export const DeveloperKey: React.FC<DeveloperKeyProps> = ({
  id,
  className,
  tabIndex = 0,
  skeleton = false,
  label,
  children,
  onCopy,
  onDelete,
}) => {
  const theme = useTheme();

  const [isFocus, setIsFocus] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const handleFocus = useCallback(() => {
    if (skeleton) {
      return;
    }

    setIsFocus(true);
    handleClick();
  }, [skeleton]);

  const handleDelete = useCallback(() => {
    if (skeleton) {
      return;
    }
    onDelete?.(id);
  }, [skeleton, id, onDelete]);

  return (
    <IconProvider>
      <DeveloperKeyWrapper $skeleton={skeleton}>
        {label && <DeveloperKeyLabel>{label}</DeveloperKeyLabel>}
        <DeveloperKeyContent>
          <DeveloperKeyStyled
            $skeleton={skeleton}
            className={className}
            tabIndex={tabIndex}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
          >
            {!skeleton && <DeveloperKeyValue>{children}</DeveloperKeyValue>}
            {skeleton && (
              <DeveloperKeyValue>
                <Skeleton fullWidth />
              </DeveloperKeyValue>
            )}
            <DeveloperKeyCopyIcon
              as={isFocus ? CheckSmallIcon : CopyIcon}
              size={18}
              fill={
                isFocus
                  ? theme.colors.accent.primaryLight
                  : theme.colors.grayScale.gray1
              }
            />
          </DeveloperKeyStyled>
          <DeveloperKeyDeleteButton onClick={handleDelete} $skeleton={skeleton}>
            <DeveloperKeyDeleteIcon size={20} />
          </DeveloperKeyDeleteButton>
        </DeveloperKeyContent>
      </DeveloperKeyWrapper>
    </IconProvider>
  );
};

export * from './list';
