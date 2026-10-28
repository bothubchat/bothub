import { describe, test, expect, afterEach, vi } from 'vitest';
import { useState } from 'react';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { customRender } from '@/ui/tests';
import {
  Header,
  HeaderLangDropdown,
  HeaderLangDropdownItem,
  HeaderLangDropdownList,
  HeaderMenuNav,
  HeaderMenuProvider,
  HeaderNav,
  HeaderNavDropdown,
  HeaderUser,
  HeaderUserInfo,
  HeaderUserInfoItem,
  MenuItems,
  MultilevelMenu,
} from './index';

const countListeners = (
  spy: ReturnType<typeof vi.spyOn>,
  types: string[],
): number =>
  spy.mock.calls.filter(([type]: unknown[]) => types.includes(type as string))
    .length;

const langNode = (
  <HeaderLangDropdown lang="ru">
    <HeaderLangDropdownList>
      <HeaderLangDropdownItem>ru</HeaderLangDropdownItem>
      <HeaderLangDropdownItem>en</HeaderLangDropdownItem>
    </HeaderLangDropdownList>
  </HeaderLangDropdown>
);

describe('Header', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('closed dropdowns do not listen to the document and the window', () => {
    const documentSpy = vi.spyOn(document, 'addEventListener');
    const windowSpy = vi.spyOn(window, 'addEventListener');

    customRender(
      <Header
        logo={<span>logo</span>}
        nav={
          <HeaderNav>
            <HeaderNavDropdown label="Section">
              <a href="/">Item</a>
            </HeaderNavDropdown>
          </HeaderNav>
        }
        lang={langNode}
        user={
          <HeaderUser>
            <HeaderUserInfo
              avatar={<span>A</span>}
              name="User"
              tokens="1000"
            >
              <HeaderUserInfoItem icon={<span />}>Item</HeaderUserInfoItem>
            </HeaderUserInfo>
          </HeaderUser>
        }
      />,
    );

    expect(
      countListeners(documentSpy, ['click', 'mousedown', 'touchstart']),
    ).toBe(0);
    expect(countListeners(windowSpy, ['blur'])).toBe(0);
  });

  test('lang dropdown renders its items only while open', async () => {
    customRender(langNode);

    expect(screen.queryByText('en')).toBeNull();

    fireEvent.click(screen.getByText('ru'));
    expect(screen.getByText('en')).not.toBeNull();

    fireEvent.mouseDown(document.body);
    await waitFor(() => expect(screen.queryByText('en')).toBeNull());
  });

  test('lang dropdown closes on window blur', async () => {
    customRender(langNode);

    fireEvent.click(screen.getByText('ru'));
    expect(screen.getByText('en')).not.toBeNull();

    act(() => {
      window.dispatchEvent(new FocusEvent('blur'));
    });
    await waitFor(() => expect(screen.queryByText('en')).toBeNull());
  });

  test('nav dropdown inside the menu stays open on an outside click', () => {
    customRender(
      <HeaderMenuProvider isInMenu>
        <HeaderNavDropdown label="Section">
          <a href="/">Item</a>
        </HeaderNavDropdown>
      </HeaderMenuProvider>,
    );

    fireEvent.click(screen.getByText('Section'));
    expect(screen.getByText('Item')).not.toBeNull();

    fireEvent.mouseDown(document.body);
    expect(screen.getByText('Item')).not.toBeNull();
  });

  test('menu open state can switch between controlled and uncontrolled', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const onOpen = vi.fn();

    const Host = () => {
      const [open, setOpen] = useState<boolean | undefined>(undefined);

      return (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
          >
            control
          </button>
          <Header
            open={open}
            onOpen={onOpen}
            menuToggleAriaLabel="menu"
          />
        </>
      );
    };

    customRender(<Host />);

    fireEvent.click(screen.getAllByLabelText('menu')[0]);
    expect(onOpen).toHaveBeenLastCalledWith(true);

    fireEvent.click(screen.getByText('control'));
    fireEvent.click(screen.getAllByLabelText('menu')[0]);
    expect(onOpen).toHaveBeenLastCalledWith(true);
  });
});

describe('HeaderMenuNav', () => {
  afterEach(() => {
    cleanup();
  });

  test('does not render "0" for a parent without children', async () => {
    const items: MenuItems[] = [{ id: 'empty', label: 'Empty', children: [] }];

    const { container } = customRender(
      <HeaderMenuNav
        items={items}
        isDesktop
      />,
    );

    fireEvent.mouseEnter(screen.getByText('Empty'));
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    });

    expect(container.textContent).toBe('Empty');
  });

  test('keeps divider nodes between renders', async () => {
    const items: MenuItems[] = [
      {
        id: 'parent',
        label: 'Parent',
        children: [
          { id: 'a', label: 'A', type: 'link', href: '/a' },
          { type: 'divider' },
          { id: 'b', label: 'B', type: 'link', href: '/b' },
        ],
      },
    ];

    customRender(
      <HeaderMenuNav
        items={items}
        isDesktop
      />,
    );

    fireEvent.mouseEnter(screen.getByText('Parent'));
    await waitFor(() => expect(screen.getByText('A')).not.toBeNull());

    const link = screen.getByText('A').closest('a')!;
    const divider = link.nextElementSibling;

    fireEvent.mouseEnter(screen.getByText('B').closest('a')!);
    expect(link.nextElementSibling).toBe(divider);
  });
});

describe('MultilevelMenu', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders an accordion without children', () => {
    customRender(
      <MultilevelMenu config={[{ accordion_title: 'Empty', children: [] }]} />,
    );

    expect(screen.getByText('Empty')).not.toBeNull();
  });
});
