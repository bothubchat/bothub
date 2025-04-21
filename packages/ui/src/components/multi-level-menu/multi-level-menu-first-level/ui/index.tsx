import { useTransition } from '@react-spring/web';
import { TFirstLevelItem } from '../../types';
import {
  MultiLevelFirstLevelMenuLi,
  MultiLevelMenuFirsLevelHeader,
  MultiLevelMenuFirsLevelHeaderContent,
  MultiLevelMenuFirsLevelTitle,
  MultiLevelMenuArrowRight,
  MultiLevelMenuArrowRight45,
  MultiLevelMenuSecondLevelWrapper,
  MultiLevelMenuSecondLevelLi,
  MultiLevelMenuSecondLevelCardLink,
  MultiLevelMenuSecondLevelHeader,
  MultiLevelMenuSecondLevelHeaderContent,
  MultiLevelMenuSecondLevelSubTitle,
  MultiLevelMenuSecondLevelDescription
} from './styled';

interface IMultiLevelMenuFirstLevelItem {
  firstLevelItem: TFirstLevelItem;
  accordion_title: string;
  openFirstLevelMenu: boolean;
  handleFirstLevelToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
export const MultiLevelMenuFirstLevelItem: React.FC<
  IMultiLevelMenuFirstLevelItem
> = ({
  firstLevelItem,
  accordion_title,
  handleFirstLevelToggle,
  onMouseEnter,
  onMouseLeave,
  openFirstLevelMenu
}) => {
  const dropdownTransition = useTransition(openFirstLevelMenu, {
    from: { opacity: 0, height: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, height: 'auto', transform: 'translateY(0)' },
    leave: { opacity: 0, height: 0, transform: 'translateY(-20px)' },
    config: { duration: 200 }
  });

  return (
    <MultiLevelFirstLevelMenuLi
      $active={openFirstLevelMenu}
      $gotChild={!!firstLevelItem.children}
    >
      <MultiLevelMenuFirsLevelHeader
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        $active={openFirstLevelMenu}
        onClick={handleFirstLevelToggle}
        as={firstLevelItem.children ? 'div' : 'a'}
        href={firstLevelItem.children ? undefined : firstLevelItem.path}
      >
        <MultiLevelMenuFirsLevelHeaderContent>
          {firstLevelItem.icon}
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
      {dropdownTransition(
        (style, item) =>
          item && (
            <MultiLevelMenuSecondLevelWrapper
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              style={style}
              $open={openFirstLevelMenu && !!item}
            >
              {firstLevelItem.children &&
                firstLevelItem.children.map(
                  (childrenItem, indexChildrenItem) => (
                    <MultiLevelMenuSecondLevelLi key={indexChildrenItem}>
                      <MultiLevelMenuSecondLevelCardLink
                        href={childrenItem.path}
                      />
                      <MultiLevelMenuSecondLevelHeader>
                        <MultiLevelMenuSecondLevelHeaderContent>
                          {childrenItem.icon}
                          <MultiLevelMenuFirsLevelTitle>
                            {childrenItem.title}
                          </MultiLevelMenuFirsLevelTitle>
                          <MultiLevelMenuSecondLevelSubTitle>
                            {childrenItem.sub_title}
                          </MultiLevelMenuSecondLevelSubTitle>
                        </MultiLevelMenuSecondLevelHeaderContent>
                        <MultiLevelMenuArrowRight45 />
                      </MultiLevelMenuSecondLevelHeader>
                      {childrenItem.description && (
                        <MultiLevelMenuSecondLevelDescription>
                          {childrenItem.description}
                        </MultiLevelMenuSecondLevelDescription>
                      )}
                    </MultiLevelMenuSecondLevelLi>
                  )
                )}
            </MultiLevelMenuSecondLevelWrapper>
          )
      )}
    </MultiLevelFirstLevelMenuLi>
  );
};
