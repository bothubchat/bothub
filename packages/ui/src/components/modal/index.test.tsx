import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { useState } from 'react';
import { customRender, TestProvider } from '@/ui/tests';
import { Menu } from '@/ui/components/menu';
import { Modal } from './index';

const pressEscape = () => {
  fireEvent.keyUp(document.activeElement ?? document.body, {
    key: 'Escape',
  });
};

describe('Modal', () => {
  beforeEach(() => {
    // jsdom has no ResizeObserver
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}

        unobserve() {}

        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('keeps the dialog mounted until the close animation ends', async () => {
    const onExited = vi.fn();
    const { rerender } = customRender(
      <Modal
        open
        title="Title"
        onExited={onExited}
      />,
    );
    await screen.findByRole('dialog');

    rerender(
      <TestProvider>
        <Modal
          open={false}
          title="Title"
          onExited={onExited}
        />
      </TestProvider>,
    );

    // Still there while the leave animation plays
    expect(screen.queryByRole('dialog')).not.toBeNull();

    await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1), {
      timeout: 2000,
    });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  test('closes only the topmost layer on Escape', async () => {
    const onModalClose = vi.fn();

    customRender(
      <Modal
        open
        title="Title"
        onClose={onModalClose}
      >
        <Menu
          defaultOpen
          buttonLabel="Actions"
        >
          Menu content
        </Menu>
      </Modal>,
    );
    await screen.findByText('Menu content');

    pressEscape();
    await waitFor(() => expect(screen.queryByText('Menu content')).toBeNull());
    expect(onModalClose).not.toHaveBeenCalled();

    pressEscape();
    expect(onModalClose).toHaveBeenCalledTimes(1);
  });

  test('moves focus into the dialog and gives it back on close', async () => {
    const Example = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
          >
            Open
          </button>
          <Modal
            open={open}
            title="Title"
            closeAriaLabel="Close"
            onClose={() => setOpen(false)}
          />
        </>
      );
    };
    customRender(<Example />);

    const opener = screen.getByText('Open');
    opener.focus();
    fireEvent.click(opener);

    const dialog = await screen.findByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);

    const close = screen.getByLabelText('Close');
    expect(close.getAttribute('type')).toBe('button');
    act(() => {
      close.click();
    });

    expect(document.activeElement).toBe(opener);
  });
});
