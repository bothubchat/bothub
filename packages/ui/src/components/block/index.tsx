import React from 'react';
import {
  BlockBody,
  BlockBodyContent,
  BlockBodyScrollbarWrapper,
  BlockHead,
  BlockStyled,
  BlockTitle,
} from './styled';
import { BlockVariant } from './types';

export interface BlockProps extends React.PropsWithChildren {
  className?: string;
  title?: string;
  toolbar?: React.ReactNode;
  background?: React.ReactNode;
  fullHeight?: boolean;
  variant?: BlockVariant;
}

export const Block: React.FC<BlockProps> = ({
  className,
  title,
  toolbar,
  background,
  variant = 'rounded',
  fullHeight = false,
  children,
}) => {
  const isHead = !!title;
  const isToolbar = !!toolbar;

  return (
    <BlockStyled
      $variant={variant}
      className={className}
    >
      {isHead && (
        <BlockHead $toolbar={isToolbar}>
          {title && <BlockTitle>{title}</BlockTitle>}
          {toolbar}
        </BlockHead>
      )}
      <BlockBody $head={isHead}>
        {background}
        <BlockBodyScrollbarWrapper>
          <BlockBodyContent
            $head={isHead}
            $fullHeight={fullHeight}
          >
            {children}
          </BlockBodyContent>
        </BlockBodyScrollbarWrapper>
      </BlockBody>
    </BlockStyled>
  );
};

export * from './types';
export * from './styled';
