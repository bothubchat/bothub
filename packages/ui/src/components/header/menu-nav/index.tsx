import { useCallback, useRef, useState } from 'react';
import { SpringValue, useSpring } from '@react-spring/web';
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
  HeaderMenuNavLabel,
  HeaderMenuNavContentMobile,
  HeaderMenuNavLink,
  HeaderMenuNavTextDescription,
} from './styled';
import { MenuItem, MenuItemChild, MenuItemCollapse, MenuItems } from './config';
import { IconProvider } from '@/ui/components/icon';
import { Divider } from '@/ui/components/divider';
import { ArrowDownIcon } from '@/ui/icons';

export const HeaderMenuNav: React.FC<{
  items: MenuItems[];
  isDesktop: boolean;
}> = ({ items, isDesktop }) => {
  const [parent, setParent] = useState<MenuItems | null>(null);
  const [child, setChild] = useState<
    MenuItemChild | (MenuItem & MenuItemCollapse) | null
  >(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [springsChildContent, animationChildContent] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateX(-50px)' },
  }));

  const startAnimation = useCallback(
    (side: 'left' | 'right') => {
      animationChildContent.start({
        from: {
          opacity: 0,
          transform: side === 'left' ? 'translateX(-50px)' : 'translateX(50px)',
        },
        to: {
          opacity: 1,
          transform: 'translateX(0%)',
        },
      });
    },
    [animationChildContent],
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

        if (nextIndex !== -1 && prevIndex !== nextIndex) {
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
    [parent, startAnimation, clearTimeouts],
  );

  const handleMouseEnterChild = useCallback(
    (item: MenuItemChild | (MenuItem & MenuItemCollapse)) => {
      clearTimeouts();
      setChild(item);
    },
    [clearTimeouts],
  );

  const handleMouseEnterContent = useCallback(() => {
    clearTimeouts();
  }, [clearTimeouts]);

  return (
    <HeaderMenuNavStyled onMouseLeave={handleClose}>
      <HeaderMenuNavList>
        {items?.map((item) => (
          <HeaderMenuNavItem
            key={item.id}
            onMouseEnter={() => handleMouseEnterParent(item.id)}
            onPointerDown={(e) => {
              e.stopPropagation();
              handleMouseEnterParent(item.id);
            }}
          >
            <HeaderMenuNavLabel
              variant={isDesktop ? 'body-m-semibold' : 'body-l-semibold'}
              data-test={item.label}
            >
              {item.label}
              {!isDesktop && item.children && item.children.length > 0 && (
                <ArrowDownIcon />
              )}
            </HeaderMenuNavLabel>

            {!isDesktop && item.id === parent?.id && (
              <HeaderMenuNavContentMobile
                key={item.id}
                onPointerUp={handleMouseEnterContent}
              >
                <HeaderFirstLevelSubMenu
                  parent={parent}
                  child={child}
                  handleMouseEnterChild={handleMouseEnterChild}
                  springsChildContent={springsChildContent}
                />
                <HeaderCollapseSubMenu
                  springsChildContent={springsChildContent}
                  child={child}
                  parent={parent}
                  handleMouseEnterContent={handleMouseEnterContent}
                />
                <HeaderLinkSubMenu
                  parent={parent}
                  child={child}
                  handleMouseEnterContent={handleMouseEnterContent}
                />
              </HeaderMenuNavContentMobile>
            )}
          </HeaderMenuNavItem>
        ))}
      </HeaderMenuNavList>

      {isDesktop && (
        <HeaderMenuNavContent
          $open={parent !== null}
          onPointerUp={handleMouseEnterContent}
          onMouseEnter={handleMouseEnterContent}
        >
          <HeaderFirstLevelSubMenu
            parent={parent}
            child={child}
            handleMouseEnterChild={handleMouseEnterChild}
            springsChildContent={springsChildContent}
          />
          <HeaderCollapseSubMenu
            springsChildContent={springsChildContent}
            child={child}
            parent={parent}
            handleMouseEnterContent={handleMouseEnterContent}
          />
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
  handleMouseEnterContent?: () => void;
}> = ({ parent, child, handleMouseEnterContent }) =>
  parent !== null &&
  child !== null &&
  (child?.type === 'link' || child?.type === 'button') &&
  child?.children && (
    <HeaderMenuNavContentChildList
      onPointerUp={handleMouseEnterContent}
      onMouseEnter={handleMouseEnterContent}
    >
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
      onPointerUp={handleMouseEnterContent}
      onMouseEnter={handleMouseEnterContent}
    >
      {child.children.map((item, index) => {
        switch (item.type) {
          case 'link':
            return (
              <HeaderMenuNavLink
                key={item.id}
                $height={child.height}
                href={item.href}
                onMouseEnter={handleMouseEnterContent}
                onPointerUp={handleMouseEnterContent}
                data-test={item.label}
              >
                <HeaderMenuNavMainLinkContainer>
                  <IconProvider size={18}>{item.icon}</IconProvider>
                  <HeaderMenuNavTextLink>{item.label}</HeaderMenuNavTextLink>
                  <HeaderMenuNavItemBgIcon>
                    <HeaderMenuNavItemArrowIcon />
                  </HeaderMenuNavItemBgIcon>
                </HeaderMenuNavMainLinkContainer>
                {item.description && (
                  <HeaderMenuNavTextDescription>
                    {item.description}
                  </HeaderMenuNavTextDescription>
                )}
              </HeaderMenuNavLink>
            );
          case 'button':
            return (
              <HeaderMenuNavLink
                key={item.id}
                as="button"
                $height={child.height}
                onClick={item.onClick}
                onMouseEnter={handleMouseEnterContent}
                onPointerUp={handleMouseEnterContent}
                data-test={item.label}
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
              </HeaderMenuNavLink>
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
    item: MenuItemChild | (MenuItem & MenuItemCollapse),
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
            $active={child?.type !== 'divider' && child?.id === item.id}
            onMouseEnter={() => handleMouseEnterChild(item)}
            onPointerUp={() => handleMouseEnterChild(item)}
            key={item.id}
            {...(item.type === 'button' && { onClick: item.onClick })}
            {...(item.type === 'link' && { href: item.href })}
            data-test={item.label}
          >
            <HeaderMenuNavMainLinkContainer>
              <IconProvider size={18}>{item.icon}</IconProvider>
              <HeaderMenuNavTextLink>{item.label}</HeaderMenuNavTextLink>
              {item.type === 'collapse' && <HeaderMenuNavArrowIcon />}
              {['link', 'button'].includes(item.type) && (
                <HeaderMenuNavItemArrowIcon />
              )}
            </HeaderMenuNavMainLinkContainer>
          </HeaderMenuNavMainLink>
        );
      })}
    </HeaderMenuNavContentList>
  );

export * from './config';
