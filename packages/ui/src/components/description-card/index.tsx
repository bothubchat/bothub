import React from 'react';
import {
  DescriptionCardBackground,
  DescriptionCardBackgroundWrapper, 
  DescriptionCardBorderWrapper, 
  DescriptionCardButton, 
  DescriptionCardContent, 
  DescriptionCardStyled, 
  DescriptionCardText, 
  DescriptionCardTitle
} from './styled';
import { DescriptionCardVariant } from './types';

export interface DescriptionCardProps extends Omit<React.ComponentProps<typeof DescriptionCardStyled>, 'title' | '$variant'> {
  title?: React.ReactNode | string;
  text?: React.ReactNode | string;
  button?: React.ReactNode | boolean;
  variant?: DescriptionCardVariant;
}

export const DescriptionCard: React.FC<DescriptionCardProps> = ({
  title, text, button, variant = 'main', ...props 
}) => (
  <DescriptionCardStyled {...props} $variant={variant}>
    <DescriptionCardBorderWrapper>
      <DescriptionCardBackgroundWrapper>
        <DescriptionCardBackground />
        <DescriptionCardContent>
          {typeof title === 'string' ? <DescriptionCardTitle>{title}</DescriptionCardTitle> : title}
          {typeof text === 'string' ? <DescriptionCardText>{text}</DescriptionCardText> : text}
          {button === true ? <DescriptionCardButton>Подробнее</DescriptionCardButton> : button}
        </DescriptionCardContent>
      </DescriptionCardBackgroundWrapper>
    </DescriptionCardBorderWrapper>
  </DescriptionCardStyled>
);

export * from './styled';
export * from './types';
