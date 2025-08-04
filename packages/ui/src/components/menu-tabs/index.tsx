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
  const [selectedTab, setTabs] = useState<string>(defaultTab || tabs[0].value);
  const refTabLine = useRef<HTMLDivElement>(null);
  const refTabs = useRef<HTMLDivElement>(null);

  const handleClick = (tab: string) => {
    setTabs(tab);
    onChangeValue?.(tab);
  };

  useEffect(() => {
    const tabsAnimation = () => {
      if (refTabLine.current && refTabs.current) {
        const tabLine = refTabLine.current;
        const tabsContent = refTabs.current;

        if (tabLine && tabsContent) {
          const childIndex = tabs.findIndex(
            ({ value }) => value === selectedTab,
          );
          const childTab = tabsContent.children[childIndex];
          if (childTab) {
            const parentTabRect = tabsContent.getBoundingClientRect();
            const childTabRect = childTab.getBoundingClientRect();
            const x1 = parentTabRect.left;
            const x2 = childTabRect.left;
            const x = x2 - x1;
            tabLine.style.width = `${childTabRect.width}px`;
            tabLine.style.left = `${x}px`;
          }
        }
      }
    };
    tabsAnimation();
    window.addEventListener('resize', tabsAnimation);
    return () => {
      window.removeEventListener('resize', tabsAnimation);
    };
  }, [selectedTab, refTabs.current, refTabLine.current]);

  return (
    <MenuTabsStyled>
      <MenuTabsList>
        <MenuTabsWrapper>
          <MenuTabsContent ref={refTabs}>
            {tabs.map(({ label, value }) => (
              <MenuTabsItem
                $active={value === selectedTab}
                key={value}
                onClick={() => handleClick(value)}
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
