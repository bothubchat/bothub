import { useEffect, useState } from 'react';
import * as S from './styled';
import { Slider } from '../slider';
import { ITab, Variant } from './types';

type ScrollableTabsProps = {
  variant?: Variant;
  component: 'a' | 'button';
  tabs: ITab[];
  selectedTab?: string;
  defaultTabId?: string;
  onClick?(id: string | null): void;
};

export const ScrollableTabs = ({
  tabs,
  variant = 'primary',
  component = 'a',
  selectedTab,
  defaultTabId,
  onClick
}: ScrollableTabsProps) => {
  const [selected, setSelected] = useState<string | null>(
    selectedTab || defaultTabId || null
  );

  useEffect(() => {
    if (selectedTab) {
      setSelected(selectedTab);
    }
  }, [selectedTab]);

  const onTabChange = (id: string) => {
    const newValue = id === selected ? null : id;

    setSelected(newValue);

    if (onClick) {
      onClick(newValue);
    }
  };

  return (
    <Slider
      arrowsSize={variant === 'primary' ? 'md' : 'sm'}
      gap={variant === 'primary' ? 20 : 8}
    >
      {tabs.map(({ id, label, icon, href }) => (
        <S.ScrollableTabsTab
          key={id}
          as={component}
          $variant={variant}
          $selected={id === selected}
          onClick={() => onTabChange(id)}
          href={component === 'a' ? href : undefined}
        >
          {icon}
          <S.ScrollableTabsTabLabel $variant={variant}>
            {label}
          </S.ScrollableTabsTabLabel>
        </S.ScrollableTabsTab>
      ))}
    </Slider>
  );
};

export type { ITab } from './types';
