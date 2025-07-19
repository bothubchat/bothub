import { useEffect, useState } from 'react';
import * as S from './styled';
import { Slider } from '../slider';
import { ScrollableTabsProps } from './types';

export const ScrollableTabs = ({
  tabs,
  variant = 'primary',
  component = 'a',
  selectedTab,
  defaultTabId,
  fullWidth,
  notNullable,
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
    const newValue = id === selected ? (notNullable ? id : null) : id;

    setSelected(newValue);
    onClick?.(newValue);
  };

  const tabsNode = tabs.map(({ id, label, icon, href }) => (
    <S.ScrollableTabsTab
      key={id}
      as={component}
      $variant={variant}
      $selected={id === selected}
      $fullWidth={fullWidth}
      onClick={() => onTabChange(id)}
      href={component === 'a' ? href : undefined}
      data-test={label}
    >
      {icon}
      <S.ScrollableTabsTabLabel $variant={variant}>
        {label}
      </S.ScrollableTabsTabLabel>
    </S.ScrollableTabsTab>
  ));

  return (
    <>
      {fullWidth ? (
        <S.ScrollableTabsFullWidth>{tabsNode}</S.ScrollableTabsFullWidth>
      ) : (
        <Slider
          arrowsSize={variant === 'primary' ? 'md' : 'sm'}
          gap={variant === 'primary' ? 20 : 8}
        >
          {tabsNode}
        </Slider>
      )}
    </>
  );
};

export type { ITab, ScrollableTabsProps } from './types';
