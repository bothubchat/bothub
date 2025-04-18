import React, { useCallback, useState } from 'react';
import {
  DescriptionCardBackground,
  DescriptionCardBackgroundWrapper,
  DescriptionCardBorderWrapper,
  DescriptionCardContent,
  DescriptionCardStyled,
  DescriptionCardText,
  DescriptionCardTitle,
  DescriptionCardTertiaryTitle,
  DescriptionCardTertiaryText
} from './styled';
import {
  TDescriptionCard,
  DescriptionCardVariant,
  TDescriptionCardBackground
} from './types';
import { LinksIcon } from '@/ui/icons/links';
import { useTheme } from '@/ui/theme';

export interface DescriptionCardProps
  extends Omit<
    React.ComponentProps<typeof DescriptionCardStyled>,
    'title' | '$variant'
  > {
  icon?: React.ReactNode;
  title?: React.ReactNode | string;
  text?: React.ReactNode | string;
  variant?: DescriptionCardVariant;
  descriptionCardType?: TDescriptionCard;
  bgDescriptionCard?: TDescriptionCardBackground;
  children?: React.ReactNode;
}

export const DescriptionCard: React.FC<DescriptionCardProps> = ({
  icon = <LinksIcon />,
  title,
  descriptionCardType,
  bgDescriptionCard,
  text,
  children,
  variant = 'main',
  ...props
}) => {
  const theme = useTheme();

  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const hoverX: number = event.pageX - event.currentTarget.offsetLeft;
      const hoverY: number = event.pageY - event.currentTarget.offsetTop;

      setHoverX(hoverX);
      setHoverY(hoverY);

      props.onMouseMove?.(event);
    },
    [props.onMouseMove]
  );
  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setHoverX(0);
      setHoverY(0);

      props.onMouseLeave?.(event);
    },
    [props.onMouseLeave]
  );

  return (
    <DescriptionCardStyled
      {...props}
      $variant={variant}
      $descriptionCardType={descriptionCardType}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <DescriptionCardBorderWrapper
        $variant={variant}
        style={
          variant !== 'tertiary'
            ? {
                background: `radial-gradient(100% 100% at ${hoverX}px ${hoverY}px, ${theme.colors.accent.primary}, rgba(0, 0, 0, 0.0))`
              }
            : {}
        }
      >
        <DescriptionCardBackgroundWrapper
          $variant={variant}
          style={
            variant !== 'tertiary'
              ? {
                  background: `radial-gradient(80% 70% at ${hoverX}px ${hoverY}px, rgba(28, 100, 242, 0.38) 9.34%, rgba(0, 0, 0, 0.00) 100%), #121825`
                }
              : {}
          }
        >
          <DescriptionCardBackground
            $bgVariant={bgDescriptionCard}
            $variant={variant}
          />
          <DescriptionCardContent $variant={variant}>
            {variant === 'tertiary' && icon}
            {variant !== 'tertiary' &&
              (typeof title === 'string' ? (
                <DescriptionCardTitle>{title}</DescriptionCardTitle>
              ) : (
                title
              ))}
            {variant === 'tertiary' &&
              (typeof title === 'string' ? (
                <DescriptionCardTertiaryTitle>
                  {title}
                </DescriptionCardTertiaryTitle>
              ) : (
                title
              ))}
            {variant !== 'tertiary' &&
              (typeof text === 'string' ? (
                <DescriptionCardText>{text}</DescriptionCardText>
              ) : (
                text
              ))}
            {variant === 'tertiary' &&
              (typeof text === 'string' ? (
                <DescriptionCardTertiaryText>
                  {text}
                </DescriptionCardTertiaryText>
              ) : (
                text
              ))}
            {children}
          </DescriptionCardContent>
        </DescriptionCardBackgroundWrapper>
      </DescriptionCardBorderWrapper>
    </DescriptionCardStyled>
  );
};

export * from './styled';
export * from './types';
export * from './grid';
