import React, { useRef } from 'react';
import {
  TariffCardStyled,
  TariffCardStyledContent,
  TariffCardStyledCurrency,
  TariffCardStyledName,
  TariffCardStyledPrice,
  TarrifCardStyledLeft,
  TariffCardStyledMiddle,
  TarrifCardStyledRadio,
  TarrifCardStyledRight,
  TariffCardStyledDescription,
  TariffCardStyledDescriptionIcon,
  TariffCardGiveCapsText,
  TariffCardGiveCapsBadge,
  TariffCardGiveCapsBadgeText,
  TariffCardStyledGiveCaps,
  TariffCardContainer,
  TariffCardDiscountBadge,
  TariffCardDiscountBadgeText
} from './styled';
import { TariffType } from './types';

export interface TariffCardRowProps extends React.ComponentProps<'div'> {
  name: TariffType;
  description?: string;
  giveCaps?: string;
  giveCapsText?: string;
  price: string;
  currency: string;
  oldPrice?: string;
  selected?: boolean;
  variant?: 'main' | 'dashboard';
  isDefault?: boolean;
  textDiscount?: string;
}

export const TariffCardRow: React.FC<TariffCardRowProps> = ({
  name,
  giveCaps,
  price,
  variant = 'main',
  currency,
  onChange,
  giveCapsText,
  selected,
  isDefault = true,
  children: _,
  description,
  textDiscount,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    const radio = ref.current?.querySelector('input');
    if (radio) {
      radio.click();
    }
  };

  return (
    <TariffCardStyled
      $variant={variant}
      onClick={handleClick}
      ref={ref}
      $selected={selected}
      {...props}
    >
      <TariffCardStyledContent $variant={variant}>
        <TarrifCardStyledLeft $variant={variant}>
          <TarrifCardStyledRadio
            onClick={onChange}
            checked={selected}
            name="tariff"
            value={name}
          />
          <TariffCardContainer $variant={variant}>
            <TariffCardStyledName $color={name}>{name}</TariffCardStyledName>
            <TariffCardStyledGiveCaps>
              <TariffCardGiveCapsText>{giveCapsText}</TariffCardGiveCapsText>
              <TariffCardGiveCapsBadge>
                <TariffCardGiveCapsBadgeText>
                  {giveCaps}
                </TariffCardGiveCapsBadgeText>
              </TariffCardGiveCapsBadge>
            </TariffCardStyledGiveCaps>
          </TariffCardContainer>
        </TarrifCardStyledLeft>
        <TariffCardStyledMiddle>
          <TariffCardStyledDescriptionIcon $variant={variant} />
          <TariffCardStyledDescription>
            {description}
          </TariffCardStyledDescription>
        </TariffCardStyledMiddle>
        <TarrifCardStyledRight $variant={variant}>
          <TariffCardStyledPrice
            $isDefault={isDefault}
            $variant={variant}
          >
            {price}
          </TariffCardStyledPrice>
          <TariffCardStyledCurrency
            $isDefault={isDefault}
            $variant={variant}
          >
            {currency}
          </TariffCardStyledCurrency>
        </TarrifCardStyledRight>
      </TariffCardStyledContent>
      {textDiscount && (
        <TariffCardDiscountBadge $active={!!selected}>
          <TariffCardDiscountBadgeText $active={!!selected}>
            {textDiscount}
          </TariffCardDiscountBadgeText>
        </TariffCardDiscountBadge>
      )}
    </TariffCardStyled>
  );
};
