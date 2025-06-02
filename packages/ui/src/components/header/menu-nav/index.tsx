import { useCallback, useRef, useState } from 'react';
import { useSpring } from '@react-spring/web';
import {
  HeaderMenuNavStyled,
  HeaderMenuNavList,
  HeaderMenuNavItem,
  HeaderMenuNavLabel,
  HeaderMenuNavContent,
  HeaderMenuNavContentList,
  HeaderMenuNavMainLink,
  HeaderMenuNavTextLink,
  HeaderMenuNavContentChildList,
  HeaderMenuNavArrowIcon,
  HeaderMenuNavItemArrowIcon,
  HeaderMenuNavItemBgIcon,
  HeaderMenuNavMainLinkContainer
} from './styled';
import {
  items,
  MenuItem,
  MenuItemChild,
  MenuItemCollapse,
  MenuItems
} from './config';
import { IconProvider } from '../../icon';
import { Divider } from '../../divider';

export const HeaderMenuNav: React.FC = () => {
  const [parent, setParent] = useState<MenuItems | null>(null);
  const [child, setChild] = useState<
    MenuItemChild | (MenuItem & MenuItemCollapse) | null
  >(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [springsContent, animationContent] = useSpring(() => ({
    from: {}
  }));
  const [springsChildContent, animationChildContent] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateX(-50px)' }
  }));
  // const [springsSubChildContent, animationSubChildContent] = useSpring(() => ({
  //   from: { opacity: 0, transform: 'translateX(-50px)' }
  // }));

  const startAnimnation = useCallback(
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

  const handleOpen = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      animationContent.start({
        from: { opacity: 0, display: 'none' },
        to: { opacity: 1 }
      });
    }, 500);
  }, [animationContent]);

  const handleClose = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      animationContent.start({
        from: { opacity: 1 },
        to: { opacity: 0 }
      });
    }, 500);
  }, [animationContent]);

  const handleMouseEnter = useCallback(
    (id: string) => {
      handleOpen();
      const prevIndex = items.findIndex((item) => item.id === parent?.id);
      const nextIndex = items.findIndex((item) => item.id === id);
      if (nextIndex < prevIndex) {
        startAnimnation('right');
      } else {
        startAnimnation('left');
      }
      setParent(items[nextIndex]);
      if (!items[nextIndex].children) {
        return;
      }
      setChild(items[nextIndex].children[0]);
    },
    [items, parent, startAnimnation, animationContent, handleOpen]
  );

  return (
    <HeaderMenuNavStyled
      onMouseLeave={handleClose}
      onMouseEnter={handleOpen}
    >
      <HeaderMenuNavList>
        {items.map((item) => (
          <HeaderMenuNavItem
            key={item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
          >
            <HeaderMenuNavLabel>{item.label}</HeaderMenuNavLabel>
          </HeaderMenuNavItem>
        ))}
      </HeaderMenuNavList>
      <HeaderMenuNavContent style={springsContent}>
        {parent !== null && parent?.children?.length && (
          <HeaderMenuNavContentList style={springsChildContent}>
            {parent.children.map(
              (item) =>
                item.type !== 'divider' && (
                  <HeaderMenuNavMainLink
                    $active={child?.id === item.id}
                    onPointerDown={() => setChild(item)}
                    onMouseEnter={() => setChild(item)}
                    key={item.id}
                  >
                    <HeaderMenuNavMainLinkContainer>
                      <IconProvider size={18}>{item.icon}</IconProvider>
                      <HeaderMenuNavTextLink>
                        {item.label}
                      </HeaderMenuNavTextLink>
                      {item.type === 'collapse' && <HeaderMenuNavArrowIcon />}
                      {item.type === 'link' && <HeaderMenuNavItemArrowIcon />}
                    </HeaderMenuNavMainLinkContainer>
                  </HeaderMenuNavMainLink>
                )
            )}
          </HeaderMenuNavContentList>
        )}
        {parent !== null &&
          child !== null &&
          child?.type === 'collapse' &&
          child?.children?.length && (
            <HeaderMenuNavContentChildList
              $columns={child?.columns}
              style={springsChildContent}
            >
              {child.children.map((item, index) => {
                switch (item.type) {
                  case 'link':
                    return (
                      <HeaderMenuNavMainLink
                        key={item.id}
                        style={{ minWidth: 406 }}
                      >
                        <HeaderMenuNavMainLinkContainer>
                          <IconProvider size={18}>{item.icon}</IconProvider>
                          <HeaderMenuNavTextLink>
                            {item.label}
                          </HeaderMenuNavTextLink>
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
                    return <Divider key={index} />;
                  default:
                    return null;
                }
              })}
            </HeaderMenuNavContentChildList>
          )}
        {parent !== null &&
          child !== null &&
          child?.type === 'link' &&
          child?.children && (
            <HeaderMenuNavContentChildList>
              {child.children}
            </HeaderMenuNavContentChildList>
          )}
      </HeaderMenuNavContent>
    </HeaderMenuNavStyled>
  );
};
