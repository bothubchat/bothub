import { Radio } from '@/ui/components/radio';
import {
  TariffCardStyled,
  TariffCardStyledContent,
  TariffCardContainer,
  TariffCardDescription,
  TariffCardLabel,
  TariffCardCapsBadge,
  TariffCardCapsContainer,
  TariffCardCapsText,
  TariffCardContainerPrice,
  TariffCardPrice,
  TariffCardCurrency,
  TariffCardEnterpriseButtonContainer,
  TariffCardIsPopular,
  TariffCardIsPopularText,
  TariffCardIsPopularContainer,
  TariffCardStarUnfilledIcon,
  TariffCardBackground,
  TariffCardDiscount,
  TariffCardButtonContainer,
} from './styled';
import { TariffType } from './types';

type TariffCardCommonProps = {
  label: string;
  variant: TariffType;
  description?: string;
  extraText: string;
  currency: string;
  price: string;
  discount?: string;
  caps: string;
  popularText?: string;
  onClick?: (e: React.MouseEvent) => void;
};

type TariffCardRadioProps = TariffCardCommonProps & {
  control?: 'radio';
  selected?: boolean;
  button?: never;
};

type TariffCardButtonProps = TariffCardCommonProps & {
  control: 'button';
  button: React.ReactNode;
  selected?: never;
};

type TariffCardProps = TariffCardRadioProps | TariffCardButtonProps;

type TariffCardEnterpriseProps = {
  label: string;
  variant: 'ENTERPRISE';
  description?: string;
  extraText: string;
  button: React.ReactNode;
};
export const TariffCard: React.FC<
  TariffCardProps | TariffCardEnterpriseProps
> = (props) => {
  const handleClick = (e: React.MouseEvent) => {
    if (props.variant !== 'ENTERPRISE') {
      e.preventDefault();
      props.onClick?.(e);
    }
  };

  const control =
    props.variant === 'ENTERPRISE' ? 'button' : (props.control ?? 'radio');
  const selected =
    props.variant !== 'ENTERPRISE' && control === 'radio' && !!props.selected;

  return (
    <TariffCardIsPopular
      $active={props.variant === 'PREMIUM' && !!props.popularText}
      $variant={props.variant}
      data-test={props.variant}
    >
      {props.variant === 'PREMIUM' && !!props.popularText && (
        <TariffCardIsPopularContainer>
          <TariffCardStarUnfilledIcon
            fill="#fff"
            size={16}
          />
          <TariffCardIsPopularText>{props.popularText}</TariffCardIsPopularText>
        </TariffCardIsPopularContainer>
      )}
      <TariffCardBackground>
        <TariffCardStyled
          onClick={handleClick}
          $variant={props.variant}
          $active={selected}
          $clickable={
            props.variant !== 'ENTERPRISE' &&
            (control === 'radio' || !!props.onClick)
          }
        >
          <TariffCardStyledContent
            $variant={props.variant}
            $control={control}
          >
            {props.variant !== 'ENTERPRISE' && control === 'radio' && (
              <Radio checked={selected} />
            )}
            <TariffCardContainer>
              <TariffCardLabel $color={props.variant}>
                {props.label}
              </TariffCardLabel>
              <TariffCardCapsContainer>
                <TariffCardCapsText>{props.extraText}</TariffCardCapsText>
                {props.variant !== 'ENTERPRISE' && (
                  <TariffCardCapsBadge color="blue">{`${props.caps} Caps`}</TariffCardCapsBadge>
                )}
              </TariffCardCapsContainer>
            </TariffCardContainer>
            {props.variant !== 'ENTERPRISE' && (
              <TariffCardContainerPrice>
                <TariffCardPrice>{props.price} </TariffCardPrice>
                <TariffCardCurrency>{props.currency}</TariffCardCurrency>
              </TariffCardContainerPrice>
            )}
            {props.variant === 'ENTERPRISE' && (
              <TariffCardEnterpriseButtonContainer>
                {props.button}
              </TariffCardEnterpriseButtonContainer>
            )}
          </TariffCardStyledContent>
          <TariffCardDescription>{props.description}</TariffCardDescription>
          {props.variant !== 'ENTERPRISE' && props.control === 'button' && (
            <TariffCardButtonContainer onClick={(e) => e.stopPropagation()}>
              {props.button}
            </TariffCardButtonContainer>
          )}
          {props.variant !== 'ENTERPRISE' && props.discount && (
            <TariffCardDiscount>{props.discount}</TariffCardDiscount>
          )}
        </TariffCardStyled>
      </TariffCardBackground>
    </TariffCardIsPopular>
  );
};

export { TariffCardEnterpriseButton, TariffCardArrow } from './styled';
export { type TariffType };
