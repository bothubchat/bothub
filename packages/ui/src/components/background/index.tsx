import React from 'react';
import { BackgroundVariant } from './types';
import { BackgroundBluePurpleBottomLeftImage, BackgroundBluePurpleCenterImage, BackgroundStyled } from './styled';

export interface BackgroundProps extends React.ComponentProps<'div'> {
  variant?: BackgroundVariant;
  disableRepeat?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ 
  variant = 'grid', 
  disableRepeat = false,
  ...props 
}) => {
  let imageNode: React.ReactNode;
  switch (variant) {
    case 'blue-purple':
      imageNode = <BackgroundBluePurpleCenterImage />; 
      break;
    case 'blue-purple-bottom-left':
      imageNode = <BackgroundBluePurpleBottomLeftImage />;
      break;
    default:
      imageNode = null;
      break;
  }

  return (
    <BackgroundStyled 
      $variant={variant} 
      $disableRepeat={disableRepeat}  
      {...props}
    >
      {imageNode}
    </BackgroundStyled>
  );
};

export * from './types';
