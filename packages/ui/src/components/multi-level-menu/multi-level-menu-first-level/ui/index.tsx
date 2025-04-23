import React from 'react';
import { IconProvider, MultiLevelMenuArrowRight45 } from '@/ui/index';
import { TFirstLevelItem } from '../../types';
import {
  MultiLevelFirstLevelMenuLi,
  MultiLevelMenuFirsLevelHeader,
  MultiLevelMenuFirsLevelHeaderContent,
  MultiLevelMenuFirsLevelTitle,
  MultiLevelMenuArrowRight
} from './styled';

interface IMultiLevelMenuFirstLevelItem {
  firstLevelItem: TFirstLevelItem;
  accordion_title: string;
  onMouseEnter: () => void;
  selectedItemTitle?: string;
}
export const MultiLevelMenuFirstLevelItem: React.FC<
  IMultiLevelMenuFirstLevelItem
> = ({ firstLevelItem, accordion_title, onMouseEnter, selectedItemTitle }) => (
  <MultiLevelFirstLevelMenuLi $gotChild={!!firstLevelItem.children}>
    <MultiLevelMenuFirsLevelHeader
      onMouseEnter={onMouseEnter}
      $active={firstLevelItem.title === selectedItemTitle}
      as={firstLevelItem.children ? 'div' : 'a'}
      href={firstLevelItem.children ? undefined : firstLevelItem.path}
    >
      <MultiLevelMenuFirsLevelHeaderContent>
        <IconProvider size={18}>
          {firstLevelItem.icon ? React.createElement(firstLevelItem.icon) : ''}
        </IconProvider>
        <MultiLevelMenuFirsLevelTitle>
          {firstLevelItem.title}
        </MultiLevelMenuFirsLevelTitle>
      </MultiLevelMenuFirsLevelHeaderContent>
      {firstLevelItem.children ? (
        <MultiLevelMenuArrowRight />
      ) : (
        <MultiLevelMenuArrowRight45
          $hidden={
            accordion_title === 'Компания' || accordion_title === 'Материалы'
          }
        />
      )}
    </MultiLevelMenuFirsLevelHeader>
  </MultiLevelFirstLevelMenuLi>
);
