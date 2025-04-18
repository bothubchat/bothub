import { ArrowDownIcon, ArticleIcon } from '@/ui/icons';
import { menuItems } from './config';
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
  MultiLevelMenuSecondLevelHeader,
  MultiLevelMenuSecondLevelHeaderContent,
  MultiLevelMenuSecondLevelLi,
  MultiLevelMenuSecondLevelWrapper,
  MultiLevelMenuStyled,
  MultiLevelMenuTitle,
  MultiLevelMenuWrapper
} from './styled';

export const MultilevelMenu = () => (
  <MultiLevelMenuStyled>
    <MultiLevelMenuWrapper>
      {menuItems.map((menuItem, indexMenuItem) => (
        <MultiLevelMenuLi key={indexMenuItem}>
          <MultiLevelMenuHeader>
            <MultiLevelMenuTitle>{menuItem.page_title}</MultiLevelMenuTitle>
            <ArrowDownIcon />
          </MultiLevelMenuHeader>
          <MultiLevelMenuFirstLevelWrapper>
            {menuItem.first_level.map((item, indexItem) => (
              <MultiLevelFirstLevelMenuLi key={indexItem}>
                <MultiLevelMenuFirsLevelHeader>
                  <MultiLevelMenuFirsLevelHeaderContent>
                    <ArticleIcon />
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
                        <MultiLevelMenuSecondLevelHeader>
                          <MultiLevelMenuSecondLevelHeaderContent>
                            <MultiLevelMenuFirsLevelTitle>
                              {childrenItem.title}
                            </MultiLevelMenuFirsLevelTitle>
                          </MultiLevelMenuSecondLevelHeaderContent>
                          <MultiLevelMenuArrowRight45 />
                        </MultiLevelMenuSecondLevelHeader>
                      </MultiLevelMenuSecondLevelLi>
                    ))}
                </MultiLevelMenuSecondLevelWrapper>
              </MultiLevelFirstLevelMenuLi>
            ))}
          </MultiLevelMenuFirstLevelWrapper>
        </MultiLevelMenuLi>
      ))}
    </MultiLevelMenuWrapper>
  </MultiLevelMenuStyled>
);
