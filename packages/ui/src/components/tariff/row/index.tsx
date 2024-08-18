import React from 'react';
import { 
  TariffCardStyled, 
  TariffCardStyledContent, 
  TariffCardStyledCurrency, 
  TariffCardStyledName, 
  TariffCardStyledPrice, 
  TarrifCardStyledLeft, 
  TariffCardStyledMiddle, 
  TarrifCardStyledRadio,
  TarrifCardStyledRight
} from "./styled";
import { TariffCardVariant, TariffCardColor } from './types';

export interface TariffCardProps extends React.ComponentProps<'div'> {
  variant?: TariffCardVariant;
  name: string;
  giveCaps?: React.ReactNode;
  price: string;
  currency: string;
  purchase: React.ReactNode;
  details: React.ReactNode;
  validityPeriod: string;
  color?: TariffCardColor;
}


export const TariffCard: React.FC<TariffCardProps> = ({
  variant = 'primary', name, giveCaps, price, currency, details, purchase, validityPeriod, color = 'gray', children, ...props
}) => (
  <TariffCardStyled>
    <TariffCardStyledContent>
      <TarrifCardStyledLeft>
      <TarrifCardStyledRadio/>
        <div>
          <TariffCardStyledName color={color}>{name}</TariffCardStyledName>
          {giveCaps}
        </div>
      </TarrifCardStyledLeft>
      <TariffCardStyledMiddle>
        {children}
      </TariffCardStyledMiddle>
      <TarrifCardStyledRight>
        <TariffCardStyledPrice>{price}</TariffCardStyledPrice>
        {' '}
        <TariffCardStyledCurrency>{currency}</TariffCardStyledCurrency>
      </TarrifCardStyledRight>
    </TariffCardStyledContent>
  </TariffCardStyled>
)
