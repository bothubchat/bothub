import React, { useCallback, useState } from 'react';
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
}) => {
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const hoverX: number = event.pageX - event.currentTarget.offsetLeft;
    const hoverY: number = event.pageY - event.currentTarget.offsetTop;

    setHoverX(hoverX);
    setHoverY(hoverY);

    props.onMouseMove?.(event);
  }, [props.onMouseMove]);
  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setHoverX(0);
    setHoverY(0);

    props.onMouseLeave?.(event);
  }, [props.onMouseLeave]);

  return (
    <DescriptionCardStyled 
      {...props} 
      $variant={variant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <DescriptionCardBorderWrapper 
        $variant={variant}
        $hoverX={hoverX}
        $hoverY={hoverY}  
      >
        <DescriptionCardBackgroundWrapper 
          $variant={variant}
          $hoverX={hoverX}
          $hoverY={hoverY}
        >
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
};

export * from './styled';
export * from './types';
