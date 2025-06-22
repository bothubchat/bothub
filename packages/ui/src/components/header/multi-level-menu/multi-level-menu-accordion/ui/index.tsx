import React, { useState, useRef } from 'react';
import { useTransition } from '@react-spring/web';
import {
  MultiLevelMenuArrowDownIcon,
  MultiLevelMenuFirstLevelUl,
  MultiLevelMenuFirstLevelWrapper,
  MultiLevelMenuHeader,
  MultiLevelMenuLi,
  MultiLevelMenuSecondLevelCardLink,
  MultiLevelMenuSecondLevelContentWrapper,
  MultiLevelMenuSecondLevelDescription,
  MultiLevelMenuSecondLevelHeader,
  MultiLevelMenuSecondLevelHeaderContent,
  MultiLevelMenuSecondLevelHeaderWrapper,
  MultiLevelMenuSecondLevelLi,
  MultiLevelMenuSecondLevelLiHover,
  MultiLevelMenuSecondLevelSubTitle,
  MultiLevelMenuSecondLevelWrapper,
  MultiLevelMenuTitle
} from './styled';
import { TFirstLevelItem, TMenuItem } from '../../types';
import { MultiLevelMenuFirstLevelItem } from '../../multi-level-menu-first-level';

import { MultiLevelMenuSecondLevelArrowRight45 } from '../../styled';
import { MultiLevelMenuFirstLevelTitle } from '../../multi-level-menu-first-level/ui/styled';
import { IconProvider } from '@/ui/components/icon';

interface IMultiLevelMenuAccordion {
  menuItem: TMenuItem;
  accordionIndex: number;
  openAccordion: boolean;
  handleAccordionToggle: () => void;
  handleCloseAccordion: () => void;
}

export const MultiLevelMenuAccordion: React.FC<IMultiLevelMenuAccordion> = ({
  menuItem,
  accordionIndex,
  openAccordion,
  handleCloseAccordion,
  handleAccordionToggle
}) => {
  const [selectedItem, setSelectedItem] = useState<TFirstLevelItem | undefined>(
    menuItem.children && menuItem.children[0].children
      ? menuItem.children[0]
      : undefined
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (item: TFirstLevelItem, index: number) => {
    setSelectedItem(undefined);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSelectedItem({ ...item, index });
    }, 200);
  };

  const dropdownTransition = useTransition(openAccordion, {
    from: { opacity: 0, height: 0, transform: 'translateY(-30px)' },
    enter: { opacity: 1, height: 'auto', transform: 'translateY(0)' },
    leave: { opacity: 0, height: 'auto', transform: 'translateY(-10px)' },
    config: { duration: 200 }
  });

  const secondLevelTransition = useTransition(selectedItem, {
    from: { opacity: 0, height: 0, transform: 'translateY(-10px)' },
    enter: { opacity: 1, height: 'auto', transform: 'translateY(0)' },
    leave: { opacity: 0, height: 0, transform: 'translateY(-10px)' },
    config: { duration: 100 }
  });

  return (
    <MultiLevelMenuLi data-test={menuItem.accordion_title}>
      <MultiLevelMenuHeader
        onClick={handleAccordionToggle}
        $active={openAccordion}
      >
        <MultiLevelMenuTitle $open={openAccordion}>
          {menuItem.accordion_title}
        </MultiLevelMenuTitle>
        <MultiLevelMenuArrowDownIcon $open={openAccordion} />
      </MultiLevelMenuHeader>
      {dropdownTransition(
        (style, item) =>
          item && (
            <MultiLevelMenuFirstLevelWrapper
              $open={openAccordion && !!item}
              style={style}
            >
              <MultiLevelMenuFirstLevelUl>
                {menuItem.children &&
                  menuItem.children.map((item, indexItem) => (
                    <MultiLevelMenuFirstLevelItem
                      onMouseEnter={() => handleMouseEnter(item, indexItem)}
                      firstLevelItem={item}
                      key={indexItem}
                      selectedItemTitle={selectedItem?.title}
                      linkIcon_hidden={menuItem.linkIcon_hidden}
                    />
                  ))}
              </MultiLevelMenuFirstLevelUl>
              {secondLevelTransition(
                (style, item) =>
                  item && (
                    <MultiLevelMenuSecondLevelWrapper style={style}>
                      <MultiLevelMenuSecondLevelContentWrapper
                        $columnsCount={
                          accordionIndex === 0 &&
                          selectedItem &&
                          selectedItem.index === 1
                            ? 2
                            : 1
                        }
                      >
                        {selectedItem &&
                          selectedItem.children &&
                          selectedItem.children.map(
                            (childrenItem, indexChildrenItem) => (
                              <MultiLevelMenuSecondLevelLi
                                $even={
                                  selectedItem &&
                                  selectedItem.children &&
                                  selectedItem.children.length % 2 === 0
                                }
                                $nthChildCount={
                                  accordionIndex === 0 &&
                                  selectedItem &&
                                  selectedItem.index === 1
                                    ? 2
                                    : 1
                                }
                                key={indexChildrenItem}
                                data-test={childrenItem.title}
                              >
                                <MultiLevelMenuSecondLevelLiHover
                                  onClick={handleCloseAccordion}
                                >
                                  <MultiLevelMenuSecondLevelCardLink
                                    onClick={childrenItem.onClick}
                                    href={childrenItem.path}
                                  />
                                  <MultiLevelMenuSecondLevelHeader>
                                    <MultiLevelMenuSecondLevelHeaderWrapper>
                                      <MultiLevelMenuSecondLevelHeaderContent>
                                        <IconProvider size={18}>
                                          {childrenItem.icon
                                            ? React.createElement(
                                                childrenItem.icon
                                              )
                                            : ''}
                                        </IconProvider>
                                        <MultiLevelMenuFirstLevelTitle>
                                          {childrenItem.title}
                                        </MultiLevelMenuFirstLevelTitle>
                                        <MultiLevelMenuSecondLevelSubTitle>
                                          {childrenItem.sub_title}
                                        </MultiLevelMenuSecondLevelSubTitle>
                                      </MultiLevelMenuSecondLevelHeaderContent>
                                      <MultiLevelMenuSecondLevelArrowRight45
                                        size={30}
                                      />
                                    </MultiLevelMenuSecondLevelHeaderWrapper>
                                    {childrenItem.description && (
                                      <MultiLevelMenuSecondLevelDescription>
                                        {childrenItem.description}
                                      </MultiLevelMenuSecondLevelDescription>
                                    )}
                                  </MultiLevelMenuSecondLevelHeader>
                                </MultiLevelMenuSecondLevelLiHover>
                              </MultiLevelMenuSecondLevelLi>
                            )
                          )}
                      </MultiLevelMenuSecondLevelContentWrapper>
                    </MultiLevelMenuSecondLevelWrapper>
                  )
              )}
            </MultiLevelMenuFirstLevelWrapper>
          )
      )}
    </MultiLevelMenuLi>
  );
};
