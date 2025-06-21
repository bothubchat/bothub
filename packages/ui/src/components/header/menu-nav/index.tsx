import { useCallback, useRef, useState } from 'react';
import { SpringValue, useSpring } from '@react-spring/web';
import { useMediaQuery } from '@uidotdev/usehooks';
import {
  HeaderMenuNavStyled,
  HeaderMenuNavList,
  HeaderMenuNavItem,
  HeaderMenuNavContent,
  HeaderMenuNavContentList,
  HeaderMenuNavMainLink,
  HeaderMenuNavTextLink,
  HeaderMenuNavContentChildList,
  HeaderMenuNavArrowIcon,
  HeaderMenuNavItemArrowIcon,
  HeaderMenuNavItemBgIcon,
  HeaderMenuNavMainLinkContainer,
  HeaderMenuNavLabel
} from './styled';
import {
  items,
  MenuItem,
  MenuItemChild,
  MenuItemCollapse,
  MenuItems
} from './config';
import { IconProvider } from '@/ui/components/icon';
import { Divider } from '@/ui/components/divider';
import { useTheme } from '@/ui/theme';
import { ArrowDownIcon } from '@/ui/icons';

export const HeaderMenuNav: React.FC = () => {
  const [parent, setParent] = useState<MenuItems | null>(null);
  const theme = useTheme();
  const [isTablet, isMobile] = [
    useMediaQuery(`(max-width: ${theme.tablet.maxWidth})`),
    useMediaQuery(`(max-width: ${theme.mobile.maxWidth})`)
  ];
  const isDesktop = !isTablet && !isMobile;
  const [child, setChild] = useState<
    MenuItemChild | (MenuItem & MenuItemCollapse) | null
  >(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [springsChildContent, animationChildContent] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateX(-50px)' }
  }));

  const startAnimation = useCallback(
    (side: 'left' | 'right') => {
      animationChildContent.start({
        from: {
          opacity: 0,
          transform: side === 'left' ? 'translateX(-50px)' : 'translateX(50px)'
        },
        to: {
          opacity: 1,
          transform: 'translateX(0%)'
        }
      });
    },
    [animationChildContent]
  );

  const clearTimeouts = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }, []);

  const handleClose = useCallback(() => {
    clearTimeouts();
    closeTimeout.current = setTimeout(() => {
      setParent(null);
      setChild(null);
    }, 300);
  }, [clearTimeouts]);

  const handleMouseEnterParent = useCallback(
    (id: string) => {
      clearTimeouts();

      hoverTimeout.current = setTimeout(() => {
        const prevIndex = items.findIndex((item) => item.id === parent?.id);
        const nextIndex = items.findIndex((item) => item.id === id);

        if (nextIndex !== -1) {
          if (prevIndex !== -1 && nextIndex < prevIndex) {
            startAnimation('right');
          } else {
            startAnimation('left');
          }

          setParent(items[nextIndex]);

          if (
            items[nextIndex].children &&
            items[nextIndex].children.length > 0
          ) {
            setChild(items[nextIndex].children[0]);
          } else {
            setChild(null);
          }
        }
      }, 50);
    },
    [parent, startAnimation, clearTimeouts]
  );

  const handleMouseEnterChild = useCallback(
    (item: MenuItemChild | (MenuItem & MenuItemCollapse)) => {
      clearTimeouts();
      setChild(item);
    },
    [clearTimeouts]
  );

  const handleMouseEnterContent = useCallback(() => {
    clearTimeouts();
  }, [clearTimeouts]);

  return (
    <HeaderMenuNavStyled onMouseLeave={handleClose}>
      <HeaderMenuNavList>
        {items.map((item) => (
          <HeaderMenuNavItem
            key={item.id}
            onClick={() => {
              if (isMobile && item.id === parent?.id) {
                handleClose();
              } else {
                handleMouseEnterParent(item.id);
              }
            }}
            onMouseEnter={() => handleMouseEnterParent(item.id)}
          >
            <HeaderMenuNavLabel>
              {item.label}{' '}
              {!isDesktop && item.children && item.children.length > 0 && (
                <ArrowDownIcon />
              )}
            </HeaderMenuNavLabel>

            {isMobile && item.id === parent?.id && (
              <div onMouseEnter={handleMouseEnterContent}>
                <HeaderFirstLevelSubMenu
                  parent={parent}
                  child={child}
                  handleMouseEnterChild={handleMouseEnterChild}
                  springsChildContent={springsChildContent}
                />

                {parent !== null &&
                  child !== null &&
                  child?.type === 'collapse' &&
                  child?.children?.length && (
                    <HeaderMenuNavContentChildList
                      $columns={child?.columns}
                      style={springsChildContent}
                      onMouseEnter={handleMouseEnterContent}
                    >
                      <HeaderCollapseSubMenu
                        springsChildContent={springsChildContent}
                        child={child}
                        parent={parent}
                        handleMouseEnterContent={handleMouseEnterContent}
                      />
                    </HeaderMenuNavContentChildList>
                  )}
                <HeaderLinkSubMenu
                  parent={parent}
                  child={child}
                  handleMouseEnterContent={handleMouseEnterContent}
                />
              </div>
            )}
          </HeaderMenuNavItem>
        ))}
      </HeaderMenuNavList>

      {isDesktop && (
        <HeaderMenuNavContent
          $open={parent !== null}
          onMouseEnter={handleMouseEnterContent}
        >
          <HeaderFirstLevelSubMenu
            parent={parent}
            child={child}
            handleMouseEnterChild={handleMouseEnterChild}
            springsChildContent={springsChildContent}
          />

          {parent !== null &&
            child !== null &&
            child?.type === 'collapse' &&
            child?.children?.length && (
              <HeaderMenuNavContentChildList
                $columns={child?.columns}
                style={springsChildContent}
                onMouseEnter={handleMouseEnterContent}
              >
                <HeaderCollapseSubMenu
                  springsChildContent={springsChildContent}
                  child={child}
                  parent={parent}
                  handleMouseEnterContent={handleMouseEnterContent}
                />
              </HeaderMenuNavContentChildList>
            )}
          <HeaderLinkSubMenu
            parent={parent}
            child={child}
            handleMouseEnterContent={handleMouseEnterContent}
          />
        </HeaderMenuNavContent>
      )}
    </HeaderMenuNavStyled>
  );
};

const HeaderLinkSubMenu: React.FC<{
  parent: MenuItems | null;
  child?: MenuItemChild | (MenuItem & MenuItemCollapse) | null;
  handleMouseEnterContent: () => void;
}> = ({ parent, child, handleMouseEnterContent }) =>
  parent !== null &&
  child !== null &&
  child?.type === 'link' &&
  child?.children && (
    <HeaderMenuNavContentChildList onMouseEnter={handleMouseEnterContent}>
      {child.children}
    </HeaderMenuNavContentChildList>
  );

const HeaderCollapseSubMenu: React.FC<{
  parent: MenuItems | null;
  child?: MenuItemChild | (MenuItem & MenuItemCollapse) | null;
  handleMouseEnterContent: () => void;
  springsChildContent: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}> = ({ parent, child, handleMouseEnterContent, springsChildContent }) =>
  parent !== null &&
  child !== null &&
  child?.type === 'collapse' &&
  child?.children?.length && (
    <HeaderMenuNavContentChildList
      $columns={child?.columns}
      style={springsChildContent}
      onMouseEnter={handleMouseEnterContent}
    >
      {child.children.map((item, index) => {
        switch (item.type) {
          case 'link':
            return (
              <HeaderMenuNavMainLink
                key={item.id}
                style={{ minWidth: 406 }}
                onMouseEnter={handleMouseEnterContent}
              >
                <HeaderMenuNavMainLinkContainer>
                  <IconProvider size={18}>{item.icon}</IconProvider>
                  <HeaderMenuNavTextLink>{item.label}</HeaderMenuNavTextLink>
                  <HeaderMenuNavItemBgIcon>
                    <HeaderMenuNavItemArrowIcon />
                  </HeaderMenuNavItemBgIcon>
                </HeaderMenuNavMainLinkContainer>
                {item.description && (
                  <HeaderMenuNavTextLink>
                    {item.description}
                  </HeaderMenuNavTextLink>
                )}
              </HeaderMenuNavMainLink>
            );
          case 'divider':
            return <Divider key={`child-divider-${index}`} />;
          default:
            return null;
        }
      })}
    </HeaderMenuNavContentChildList>
  );

const HeaderFirstLevelSubMenu: React.FC<{
  parent: MenuItems | null;
  child?: MenuItemChild | (MenuItem & MenuItemCollapse) | null;
  handleMouseEnterChild: (
    item: MenuItemChild | (MenuItem & MenuItemCollapse)
  ) => void;
  springsChildContent: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}> = ({ parent, child, handleMouseEnterChild, springsChildContent }) =>
  parent?.children?.length && (
    <HeaderMenuNavContentList style={springsChildContent}>
      {parent.children.map((item) => {
        if (item.type === 'divider') {
          return <Divider key={`divider-${Math.random()}`} />;
        }

        return (
          <HeaderMenuNavMainLink
            $active={
              child?.type !== 'divider' &&
              child?.type !== 'button' &&
              child?.id === item.id
            }
            onMouseEnter={() => handleMouseEnterChild(item)}
            key={item.id}
          >
            <HeaderMenuNavMainLinkContainer>
              <IconProvider size={18}>{item.icon}</IconProvider>
              <HeaderMenuNavTextLink>{item.label}</HeaderMenuNavTextLink>
              {item.type === 'collapse' && <HeaderMenuNavArrowIcon />}
              {item.type === 'link' && <HeaderMenuNavItemArrowIcon />}
            </HeaderMenuNavMainLinkContainer>
          </HeaderMenuNavMainLink>
        );
      })}
    </HeaderMenuNavContentList>
  );
