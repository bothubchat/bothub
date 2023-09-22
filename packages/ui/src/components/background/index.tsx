import React from "react";
import { BackgroundVariant } from "./types";
import { BackgroundBluePurpleImage, BackgroundStyled } from "./styled";

export interface BackgroundProps extends React.ComponentProps<'div'> {
  variant?: BackgroundVariant;
}

export const Background: React.FC<BackgroundProps> = ({ variant = null, ...props }) => {
  let imageNode: React.ReactNode;
  switch (variant) {
    case 'blue-purple':
      imageNode = <BackgroundBluePurpleImage />; 
      break;
    default:
      imageNode = null;
      break;
  }

  return (
    <BackgroundStyled $variant={variant} {...props}>
      {imageNode}
    </BackgroundStyled>
  );
};

export * from './types';
