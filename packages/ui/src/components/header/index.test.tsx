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
import { Header, HeaderMenuNav, MenuItems, MultilevelMenu } from './index';

describe('Header', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
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
