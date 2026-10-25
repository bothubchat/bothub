import React, { useCallback } from 'react';
import {
  DescriptionCardBackground,
  DescriptionCardBackgroundWrapper,
  DescriptionCardBorderWrapper,
  DescriptionCardContent,
  DescriptionCardStyled,
  DescriptionCardText,
  DescriptionCardTitle,
  DescriptionCardTertiaryTitle,
  DescriptionCardTertiaryText,
} from './styled';
import { TDescriptionCard, DescriptionCardVariant } from './types';
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
  children?: React.ReactNode;
}

const HOVER_X = '--description-card-hover-x';
const HOVER_Y = '--description-card-hover-y';
const HOVER_POSITION = `var(${HOVER_X}, 0px) var(${HOVER_Y}, 0px)`;

export const DescriptionCard: React.FC<DescriptionCardProps> = ({
  icon = <LinksIcon />,
  title,
  descriptionCardType,
  text,
  children,
  variant = 'main',
  ...props
}) => {
  const theme = useTheme();

  // The pointer position goes to CSS variables instead of state, so moving
  // the mouse does not rerender the card.
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const card = event.currentTarget;
      const { left, top } = card.getBoundingClientRect();

      card.style.setProperty(HOVER_X, `${event.clientX - left}px`);
      card.style.setProperty(HOVER_Y, `${event.clientY - top}px`);

      props.onMouseMove?.(event);
    },
    [props.onMouseMove],
  );
  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.currentTarget.style.removeProperty(HOVER_X);
      event.currentTarget.style.removeProperty(HOVER_Y);

      props.onMouseLeave?.(event);
    },
    [props.onMouseLeave],
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
                background: `radial-gradient(100% 100% at ${HOVER_POSITION}, ${theme.colors.accent.primary}, rgba(0, 0, 0, 0.0))`,
              }
            : {}
        }
      >
        <DescriptionCardBackgroundWrapper
          $variant={variant}
          style={
            variant !== 'tertiary'
              ? {
                  background: `radial-gradient(80% 70% at ${HOVER_POSITION}, rgba(28, 100, 242, 0.38) 9.34%, rgba(0, 0, 0, 0.00) 100%), #121825`,
                }
              : {}
          }
        >
          {variant === 'tertiary' && (
            <DescriptionCardBackground $variant={variant} />
          )}

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
