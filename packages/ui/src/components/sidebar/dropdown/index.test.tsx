import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender, trackGlobalListeners } from '@/ui/tests';
import { SidebarDropdownItem, SidebarListActions } from '.';

const renderMenu = () =>
  customRender(
    <>
      <SidebarListActions>
        <SidebarDropdownItem>Rename</SidebarDropdownItem>
      </SidebarListActions>
      <div data-testid="outside" />
    </>,
  );

describe('SidebarListActions', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('listens to the document and the window only while it is open', async () => {
    const countListeners = trackGlobalListeners(['blur', 'click', 'scroll']);
    renderMenu();
    expect(countListeners()).toEqual({});

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Rename')).not.toBeNull();
    expect(countListeners()).toEqual({
      'document click capture': 1,
      'window blur capture': 1,
      'window scroll capture': 1,
    });

    fireEvent.click(screen.getByTestId('outside'));
    expect(countListeners()).toEqual({});
    await waitFor(() => expect(screen.queryByText('Rename')).toBeNull());
  });

  test('closes on scroll of any element', async () => {
    renderMenu();

    fireEvent.click(screen.getByRole('button'));
    fireEvent.scroll(screen.getByTestId('outside'));

    await waitFor(() => expect(screen.queryByText('Rename')).toBeNull());
  });

  test('closes when another menu opens', () => {
    const countListeners = trackGlobalListeners(['click']);
    customRender(
      <>
        <SidebarListActions>
          <SidebarDropdownItem>Rename first</SidebarDropdownItem>
        </SidebarListActions>
        <SidebarListActions>
          <SidebarDropdownItem>Rename second</SidebarDropdownItem>
        </SidebarListActions>
      </>,
    );
    const [first, second] = screen.getAllByRole('button');

    fireEvent.click(first);
    fireEvent.click(second);

    expect(screen.getByText('Rename second')).not.toBeNull();
    expect(countListeners()).toEqual({ 'document click capture': 1 });
  });

  test('stays open after a click inside', () => {
    const countListeners = trackGlobalListeners(['click']);
    renderMenu();

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Rename'));

    expect(countListeners()).toEqual({ 'document click capture': 1 });
  });
});
