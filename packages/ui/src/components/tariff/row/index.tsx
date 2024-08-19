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
  TariffCardStyledGiveCaps
} from "./styled";
import { TariffCardVariant, TariffCardColor } from './types';

export interface TariffCardRowProps extends React.ComponentProps<'div'> {
  variant?: TariffCardVariant;
  name: string;
  description?: string;
  giveCaps?: string;
  giveCapsText?: string;
  price: string;
  currency: string;
  selected?: boolean;
  color?: TariffCardColor;
}


export const TariffCardRow: React.FC<TariffCardRowProps> = ({ 
    name, giveCaps, price, currency, onChange, giveCapsText,selected, color = 'white', children, description, ...props
  }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    const radio = ref.current?.querySelector('input');
    if(radio) {
      radio.click();
    }
  }
  
  return(
    <TariffCardStyled onClick={handleClick} ref={ref} selected={selected} {...props}>
      <TariffCardStyledContent>
        <TarrifCardStyledLeft>
          <TarrifCardStyledRadio onClick={onChange} checked={selected} name='tariff' value={name}/>
          <div>
            <TariffCardStyledName $color={color}>
              {name}
            </TariffCardStyledName>
            <TariffCardStyledGiveCaps>
              <TariffCardGiveCapsText>
                {giveCapsText}
              </TariffCardGiveCapsText>
              <TariffCardGiveCapsBadge>
                <TariffCardGiveCapsBadgeText>
                  {giveCaps}
                </TariffCardGiveCapsBadgeText>
              </TariffCardGiveCapsBadge>
            </TariffCardStyledGiveCaps>
          </div>
        </TarrifCardStyledLeft>
        <TariffCardStyledMiddle>
          <TariffCardStyledDescriptionIcon/>
          <TariffCardStyledDescription>
            {description}
          </TariffCardStyledDescription>
        </TariffCardStyledMiddle>
        <TarrifCardStyledRight>
          <TariffCardStyledPrice>{price}</TariffCardStyledPrice>
          {' '}
          <TariffCardStyledCurrency>{currency}</TariffCardStyledCurrency>
        </TarrifCardStyledRight>
      </TariffCardStyledContent>
    </TariffCardStyled>
  )
}