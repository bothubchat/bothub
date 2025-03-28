import { ReactNode } from 'react';
import * as S from './styled';
import { Scroll } from '../scroll';

type ScrollableTabsProps = {
  tabs: { id: string; label: string; href: string; icon?: ReactNode }[];
  selectedTabId?: string;
};

export const ScrollableTabs = ({
  tabs,
  selectedTabId
}: ScrollableTabsProps) => (
  <Scroll scrollMultiplier={2}>
    <S.ScrollableTabsContainer>
      {tabs.map((tab) => (
        <S.ScrollableTabsTab
          key={tab.id}
          href={tab.href}
          $selected={tab.id === selectedTabId}
        >
          {tab.icon}
          <S.ScrollableTabsTabLabel>{tab.label}</S.ScrollableTabsTabLabel>
        </S.ScrollableTabsTab>
      ))}
    </S.ScrollableTabsContainer>
  </Scroll>
);
