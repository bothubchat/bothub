import { useCallback, useEffect, useState } from 'react';
import { useSpring, useTransition } from '@react-spring/web';
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
  HeaderMenuNavItemBgIcon
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
  const [hovered, setHovered] = useState<boolean>(false);
  const [showContent, setShowContent] = useState(false);
  const [springsChildContent, animationChildContent] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateX(-50px)' }
  }));

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

  const handleMouseEnter = useCallback(
    (id: string) => {
      setHovered(true);
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
    [items, parent, startAnimnation]
  );

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const animationContent = useTransition(showContent, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });

  useEffect(() => {
    const timeOut = setTimeout(
      () => {
        setShowContent(hovered);
      },
      hovered ? 0 : 200
    );

    return () => {
      clearTimeout(timeOut);
    };
  }, [hovered]);

  return (
    <HeaderMenuNavStyled onMouseLeave={handleMouseLeave}>
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
      {animationContent((style, showContent) => (
        <HeaderMenuNavContent
          style={style}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onPointerDown={() => {
            setHovered(true);
          }}
          hidden={!showContent || !parent}
        >
          {parent !== null && parent?.children?.length && (
            <HeaderMenuNavContentList
              style={springsChildContent}
              hidden={!showContent}
            >
              {parent.children.map((item) => (
                <HeaderMenuNavMainLink
                  $active={child?.id === item.id}
                  onPointerDown={() => setChild(item)}
                  onMouseEnter={() => setChild(item)}
                  key={item.id}
                >
                  <IconProvider size={18}>{item.icon}</IconProvider>
                  <HeaderMenuNavTextLink>{item.label}</HeaderMenuNavTextLink>
                  {item.type === 'collapse' && <HeaderMenuNavArrowIcon />}
                  {item.type === 'link' && <HeaderMenuNavItemArrowIcon />}
                </HeaderMenuNavMainLink>
              ))}
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
                          <IconProvider size={18}>{item.icon}</IconProvider>
                          <HeaderMenuNavTextLink>
                            {item.label}
                          </HeaderMenuNavTextLink>
                          <HeaderMenuNavItemBgIcon>
                            <HeaderMenuNavItemArrowIcon />
                          </HeaderMenuNavItemBgIcon>
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
        </HeaderMenuNavContent>
      ))}
    </HeaderMenuNavStyled>
  );
};
