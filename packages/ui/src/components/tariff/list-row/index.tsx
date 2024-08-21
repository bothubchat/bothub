import React from 'react';
import { TariffCardRow } from '@/ui/components/tariff/row';
import { TariffListStyledRow } from './styled';

import { TariffCardColor } from '../row/types';

interface ListRowProps {
  cardList: Card[];
  onChange?: (value: string) => void;
}

export interface Card {
  name: string;
  giveCapsText: string;
  giveCaps: string;
  price: string;
  currency: string;
  color: TariffCardColor;
  description: string;
}

export const ListRow: React.FC<ListRowProps> = ({ cardList, onChange }) => {
  const ref = React.useRef<HTMLFormElement>(null);
  const [selected, setSelected] = React.useState<string>('Basic');
  const handleChange = () => {
    const form = ref.current;
    const formData = new FormData(form as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onChange?.(data.tariff as string);
    setSelected(data.tariff as string);
  };

  return (
    <TariffListStyledRow
      ref={ref}
      onChange={handleChange}
    >
      {cardList.map((card: Card, index) => (
        <TariffCardRow
          selected={selected === card.name}
          key={index}
          name={card.name}
          giveCaps={card.giveCaps}
          giveCapsText={card.giveCapsText}
          price={card.price}
          currency={card.currency}
          color={card.color}
          description={card.description}
        />
      ))}
    </TariffListStyledRow>
  );
};
