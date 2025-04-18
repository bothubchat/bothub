import { ArrowDownIcon, ArticleIcon } from '@/ui/icons';
import { menuItems } from './config';
import {
  MultiLevelMenuArrowRight,
  MultiLevelMenuArrowRight45,
  MultiLevelMenuFirsLevelHeader,
  MultiLevelMenuFirsLevelHeaderContent,
  MultiLevelMenuFirsLevelTitle,
  MultiLevelMenuFirstLevelWrapper,
  MultiLevelMenuHeader,
  MultiLevelMenuLi,
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
              <MultiLevelMenuLi key={indexItem}>
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
                <ul>
                  {item.children &&
                    item.children.map((childrenItem, indexChildrenItem) => (
                      <MultiLevelMenuLi key={indexChildrenItem}>
                        <h4>{childrenItem.title}</h4>
                      </MultiLevelMenuLi>
                    ))}
                </ul>
              </MultiLevelMenuLi>
            ))}
          </MultiLevelMenuFirstLevelWrapper>
        </MultiLevelMenuLi>
      ))}
    </MultiLevelMenuWrapper>
  </MultiLevelMenuStyled>
);
