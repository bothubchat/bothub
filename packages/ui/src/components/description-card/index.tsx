import React from 'react';
import {
  DescriptionCardBackground,
  DescriptionCardBackgroundWrapper, 
  DescriptionCardBorderWrapper, 
  DescriptionCardButton, 
  DescriptionCardContent, 
  DescriptionCardStyled, 
  DescriptionCardText, 
  DescriptionCardTitle,
  DescriptionCardTertiaryTitle,
  DescriptionCardTertiaryText
} from './styled';
import { DescriptionCardVariant } from './types';
import { LinksIcon } from '../icons';

export interface DescriptionCardProps extends Omit<React.ComponentProps<typeof DescriptionCardStyled>, 'title' | '$variant'> {
  icon?: React.ReactNode;
  title?: React.ReactNode | string;
  text?: React.ReactNode | string;
  button?: React.ReactNode | boolean;
  variant?: DescriptionCardVariant;
}

export const DescriptionCard: React.FC<DescriptionCardProps> = ({
  icon = <LinksIcon />, title, text, button, variant = 'main', ...props 
}) => (
  <DescriptionCardStyled {...props} $variant={variant}>
    <DescriptionCardBorderWrapper $variant={variant}>
      <DescriptionCardBackgroundWrapper $variant={variant}>
        <DescriptionCardBackground $variant={variant} />
        <DescriptionCardContent $variant={variant}>
          {variant === 'tertiary' && icon}
          {variant !== 'tertiary' && (typeof title === 'string' ? (
            <DescriptionCardTitle>{title}</DescriptionCardTitle>
          ) : title)}
          {variant === 'tertiary' && (typeof title === 'string' ? (
            <DescriptionCardTertiaryTitle>{title}</DescriptionCardTertiaryTitle>
          ) : title)}
          {variant !== 'tertiary' && (typeof text === 'string' ? (
            <DescriptionCardText>{text}</DescriptionCardText>
          ) : text)}
          {variant === 'tertiary' && (typeof text === 'string' ? (
            <DescriptionCardTertiaryText>{text}</DescriptionCardTertiaryText>
          ) : text)}
          {variant !== 'tertiary' && button === true ? (
            <DescriptionCardButton>Подробнее</DescriptionCardButton>
          ) : button}
        </DescriptionCardContent>
      </DescriptionCardBackgroundWrapper>
    </DescriptionCardBorderWrapper>
  </DescriptionCardStyled>
);

export * from './styled';
export * from './types';
