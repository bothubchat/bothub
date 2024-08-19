import React from 'react';
import { TariffCardRow } from '@/ui/components/tariff/row';
import { TariffListStyledRow } from './styled';

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
  color: string;
  description: string;
}

export const ListRow: React.FC<ListRowProps> = ({
  cardList,
  onChange,
  ...props
}) => {
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
      {cardList.map((card: any, index) => (
        <TariffCardRow
          selected={selected === card.name}
          key={index}
          {...card}
        />
      ))}
    </TariffListStyledRow>
  );
};
