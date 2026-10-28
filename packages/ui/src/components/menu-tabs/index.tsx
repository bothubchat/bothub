import React, { useEffect, useRef, useState } from 'react';
import {
  MenuTabsStyled,
  MenuTabsList,
  MenuTabsWrapper,
  MenuTabsContent,
  MenuTabsItem,
  MenuTabsText,
  MenuTabsLine,
} from './styled';

type MenuTab = {
  label: string;
  value: string;
};

interface MenuTabsProps {
  tabs: MenuTab[];
  defaultTab?: string;
  onChangeValue?: (value: string) => void;
}

export const MenuTabs: React.FC<MenuTabsProps> = ({
  tabs,
  defaultTab,
  onChangeValue,
}) => {
  const [selectedTab, setTabs] = useState<string>(
    defaultTab || tabs[0]?.value || '',
  );
  const refTabLine = useRef<HTMLDivElement>(null);
  const refTabs = useRef<HTMLDivElement>(null);

  const handleClick = (tab: string) => {
    setTabs(tab);
    onChangeValue?.(tab);
  };

  const handleKeyDown = (event: React.KeyboardEvent, tab: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(tab);
    }
  };

  const selectedIndex = tabs.findIndex(({ value }) => value === selectedTab);

  useEffect(() => {
    const tabLine = refTabLine.current;
    const tabsContent = refTabs.current;
    if (!tabLine || !tabsContent) {
      return;
    }

    const updateTabLine = () => {
      const childTab = tabsContent.children[selectedIndex];
      if (childTab) {
        const parentTabRect = tabsContent.getBoundingClientRect();
        const childTabRect = childTab.getBoundingClientRect();
        const x = childTabRect.left - parentTabRect.left;
        tabLine.style.width = `${childTabRect.width}px`;
        tabLine.style.transform = `translateX(${x}px)`;
      }
    };

    updateTabLine();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateTabLine);
      return () => {
        window.removeEventListener('resize', updateTabLine);
      };
    }

    // Tab positions only change when the tabs themselves resize
    const observer = new ResizeObserver(updateTabLine);
    observer.observe(tabsContent);
    return () => {
      observer.disconnect();
    };
  }, [selectedIndex, tabs.length]);

  return (
    <MenuTabsStyled>
      <MenuTabsList>
        <MenuTabsWrapper>
          <MenuTabsContent
            ref={refTabs}
            role="tablist"
          >
            {tabs.map(({ label, value }) => (
              <MenuTabsItem
                $active={value === selectedTab}
                key={value}
                role="tab"
                tabIndex={0}
                aria-selected={value === selectedTab}
                onClick={() => handleClick(value)}
                onKeyDown={(event) => handleKeyDown(event, value)}
              >
                <MenuTabsText>{label}</MenuTabsText>
              </MenuTabsItem>
            ))}
            <MenuTabsLine ref={refTabLine} />
          </MenuTabsContent>
        </MenuTabsWrapper>
      </MenuTabsList>
    </MenuTabsStyled>
  );
};
