import React from 'react';
import { IconProvider, MultiLevelMenuArrowRight45 } from '@/ui/index';
import { TFirstLevelItem } from '../../types';
import {
  MultiLevelFirstLevelMenuLi,
  MultiLevelMenuFirstLevelHeader,
  MultiLevelMenuFirstLevelHeaderContent,
  MultiLevelMenuFirstLevelTitle,
  MultiLevelMenuArrowRight
} from './styled';

interface IMultiLevelMenuFirstLevelItem {
  firstLevelItem: TFirstLevelItem;
  linkIcon_hidden?: boolean;
  onMouseEnter: () => void;
  selectedItemTitle?: string;
}
export const MultiLevelMenuFirstLevelItem: React.FC<
  IMultiLevelMenuFirstLevelItem
> = ({ firstLevelItem, linkIcon_hidden, onMouseEnter, selectedItemTitle }) => (
  <MultiLevelFirstLevelMenuLi $gotChild={!!firstLevelItem.children}>
    <MultiLevelMenuFirstLevelHeader
      onMouseEnter={onMouseEnter}
      $active={firstLevelItem.title === selectedItemTitle}
      as={firstLevelItem.children ? 'div' : 'a'}
      href={firstLevelItem.children ? undefined : firstLevelItem.path}
    >
      <MultiLevelMenuFirstLevelHeaderContent>
        <IconProvider size={18}>
          {firstLevelItem.icon ? React.createElement(firstLevelItem.icon) : ''}
        </IconProvider>
        <MultiLevelMenuFirstLevelTitle>
          {firstLevelItem.title}
        </MultiLevelMenuFirstLevelTitle>
      </MultiLevelMenuFirstLevelHeaderContent>
      {firstLevelItem.children ? (
        <MultiLevelMenuArrowRight />
      ) : (
        <MultiLevelMenuArrowRight45 $hidden={linkIcon_hidden} />
      )}
    </MultiLevelMenuFirstLevelHeader>
  </MultiLevelFirstLevelMenuLi>
);
