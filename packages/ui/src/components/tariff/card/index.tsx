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
} from './styled';
import { TariffType } from './types';

type TariffCardProps = {
  label: string;
  variant: TariffType;
  description?: string;
  extraText: string;
  currency: string;
  price: string;
  discount?: string;
  selected?: boolean;
  caps: string;
  popularText?: string;
  onClick?: (e: React.MouseEvent) => void;
};

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
          $active={props.variant !== 'ENTERPRISE' && !!props.selected}
        >
          <TariffCardStyledContent $variant={props.variant}>
            {props.variant !== 'ENTERPRISE' && (
              <Radio
                onClick={handleClick}
                checked={!!props.selected}
              />
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
          {props.variant !== 'ENTERPRISE' && props.discount && (
            <TariffCardDiscount>{props.discount}</TariffCardDiscount>
          )}
        </TariffCardStyled>
      </TariffCardBackground>
    </TariffCardIsPopular>
  );
};

export { TariffCardEnterpriseButton, TariffCardArrow } from './styled';
