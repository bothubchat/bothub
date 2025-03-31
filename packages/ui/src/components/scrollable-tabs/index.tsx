import * as S from './styled';
import { Slider } from '../slider';
import { ITab, Variant } from './types';

type ScrollableTabsProps = {
  tabs: ITab[];
  variant?: Variant;
  selectedTabId?: string;
};

export const ScrollableTabs = ({
  tabs,
  variant = 'primary',
  selectedTabId
}: ScrollableTabsProps) => (
  <Slider gap={variant === 'primary' ? 20 : 8}>
    {tabs.map((tab) => (
      <S.ScrollableTabsTab
        key={tab.id}
        href={tab.href}
        $variant={variant}
        $selected={tab.id === selectedTabId}
      >
        {tab.icon}
        <S.ScrollableTabsTabLabel $variant={variant}>
          {tab.label}
        </S.ScrollableTabsTabLabel>
      </S.ScrollableTabsTab>
    ))}
  </Slider>
);
