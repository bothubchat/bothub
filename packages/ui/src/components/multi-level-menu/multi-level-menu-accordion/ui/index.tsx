import {
  MultiLevelFirstLevelMenuLi,
  MultiLevelMenuArrowRight,
  MultiLevelMenuArrowRight45,
  MultiLevelMenuFirsLevelHeader,
  MultiLevelMenuFirsLevelHeaderContent,
  MultiLevelMenuFirsLevelTitle,
  MultiLevelMenuFirstLevelWrapper,
  MultiLevelMenuHeader,
  MultiLevelMenuLi,
  MultiLevelMenuSecondLevelCardLink,
  MultiLevelMenuSecondLevelDescription,
  MultiLevelMenuSecondLevelHeader,
  MultiLevelMenuSecondLevelHeaderContent,
  MultiLevelMenuSecondLevelLi,
  MultiLevelMenuSecondLevelWrapper,
  MultiLevelMenuTitle
} from './styled';
import { ArrowDownIcon } from '@/ui/icons';
import { TMenuItem } from '../../types';

interface IMultiLevelMenuAccordion {
  menuItem: TMenuItem;
  openAccordion: boolean;
  handleAccordionToggle: () => void;
}
export const MultiLevelMenuAccordion: React.FC<IMultiLevelMenuAccordion> = ({
  menuItem,
  openAccordion,
  handleAccordionToggle
}) => (
  <MultiLevelMenuLi onClick={handleAccordionToggle}>
    <MultiLevelMenuHeader $active={openAccordion}>
      <MultiLevelMenuTitle>{menuItem.accordion_title}</MultiLevelMenuTitle>
      <ArrowDownIcon />
    </MultiLevelMenuHeader>
    <MultiLevelMenuFirstLevelWrapper $open={openAccordion}>
      {menuItem.first_level &&
        menuItem.first_level.map((item, indexItem) => (
          <MultiLevelFirstLevelMenuLi key={indexItem}>
            <MultiLevelMenuFirsLevelHeader
              as={item.children ? 'div' : 'a'}
              href={item.children ? undefined : item.path}
            >
              <MultiLevelMenuFirsLevelHeaderContent>
                {item.icon}
                <MultiLevelMenuFirsLevelTitle>
                  {item.title}
                </MultiLevelMenuFirsLevelTitle>
              </MultiLevelMenuFirsLevelHeaderContent>
              {item.children ? (
                <MultiLevelMenuArrowRight />
              ) : (
                <MultiLevelMenuArrowRight45 />
              )}
            </MultiLevelMenuFirsLevelHeader>
            <MultiLevelMenuSecondLevelWrapper>
              {item.children &&
                item.children.map((childrenItem, indexChildrenItem) => (
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
                      </MultiLevelMenuSecondLevelHeaderContent>
                      <MultiLevelMenuArrowRight45 />
                    </MultiLevelMenuSecondLevelHeader>
                    {childrenItem.description && (
                      <MultiLevelMenuSecondLevelDescription>
                        {childrenItem.description}
                      </MultiLevelMenuSecondLevelDescription>
                    )}
                  </MultiLevelMenuSecondLevelLi>
                ))}
            </MultiLevelMenuSecondLevelWrapper>
          </MultiLevelFirstLevelMenuLi>
        ))}
    </MultiLevelMenuFirstLevelWrapper>
  </MultiLevelMenuLi>
);
