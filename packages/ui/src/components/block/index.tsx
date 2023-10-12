import React from 'react';
import {
  BlockBody, BlockBodyContent, BlockBodyScrollbarWrapper, BlockHead, BlockStyled, BlockTitle 
} from './styled';

export interface BlockProps extends React.PropsWithChildren {
  className?: string;
  title?: string;
  toolbar?: React.ReactNode;
  background?: React.ReactNode;
  fullHeight?: boolean;
}

export const Block: React.FC<BlockProps> = ({ 
  className, title, toolbar, background, fullHeight = false, children 
}) => {
  const isHead = !!title;

  return (
    <BlockStyled 
      className={className}
    >
      {isHead && (
        <BlockHead
          $toolbar={!!toolbar}
        >
          {title && (
            <BlockTitle>
              {title}
            </BlockTitle>
          )}
          {toolbar}
        </BlockHead>
      )}
      <BlockBody
        $head={isHead}
      >
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

export * from './styled';
