import React from 'react';
import { TariffCardRow, TariffCardRowProps } from '@/ui/components/tariff/row';
import { TariffListStyledRow } from './styled';

interface ListRowProps {
  cardList: TariffCardRowProps[];
  onChange?: (value: string) => void;
}

export const TariffListRow: React.FC<ListRowProps> = ({ cardList, onChange }) => {
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
      {cardList.map((card, index) => (
        <TariffCardRow
          {...card}
          selected={selected === card.name}
          key={index}
          name={card.name}
          oldPrice={card.oldPrice}
          isDefault={card.isDefault}
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
