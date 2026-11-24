import { describe, test, expect, afterEach, vi } from 'vitest';
import {
  act,
  cleanup,
  createEvent,
  fireEvent,
  screen,
  within,
} from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageActions } from '.';
import { ActionButton } from './action-button';

// jsdom has no PointerEvent, so pointerType is set by hand.
const pointerEnter = (element: Element, pointerType: string) => {
  const event = createEvent.pointerOver(element);
  Object.defineProperty(event, 'pointerType', { value: pointerType });
  fireEvent(element, event);
};

const renderActions = () => {
  const onTgCopy = vi.fn();
  const onEdit = vi.fn();
  customRender(
    <MessageActions
      id="1"
      message="Hello"
      variant="user"
      menuAriaLabel="Menu"
      copyTgText="Copy for Telegram"
      editText="Edit"
      onTgCopy={onTgCopy}
      onEdit={onEdit}
    />,
  );
  return { button: screen.getByLabelText('Menu'), onTgCopy, onEdit };
};

const BUTTON_WIDTH = 32;

// В jsdom нет раскладки: ширины ряда, распора и кнопок задаём сами
const mockLayout = (widths: { row: number; reserve?: number }) => {
  const layout = { reserve: 0, ...widths };

  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    function getRect(this: HTMLElement) {
      const isReserve = this.hasAttribute('aria-hidden');
      const width =
        this.tagName === 'BUTTON'
          ? BUTTON_WIDTH
          : layout[isReserve ? 'reserve' : 'row'];

      return new DOMRect(0, 0, width, BUTTON_WIDTH);
    },
  );

  return layout;
};

// Вызывает обработчики всех наблюдателей за размером, как после раскладки
const mockResizeObserver = () => {
  const callbacks = new Set<() => void>();

  vi.stubGlobal(
    'ResizeObserver',
    class {
      private readonly callback: () => void;

      constructor(callback: () => void) {
        this.callback = callback;
      }

      observe() {
        callbacks.add(this.callback);
      }

      disconnect() {
        callbacks.delete(this.callback);
      }
    },
  );

  return () => act(() => callbacks.forEach((callback) => callback()));
};

const mockPhone = () =>
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('max-width'),
  }));

const renderReplyActions = () => {
  const onFork = vi.fn();
  const { container } = customRender(
    <MessageActions
      id="1"
      message="Hello"
      variant="assistant"
      disableDownload
      disableEncryption
      menuAriaLabel="Menu"
      copyTooltipLabel="Copy"
      updateTooltipLabel="Regenerate"
      disableFork={false}
      forkTooltipLabel="Fork"
      copyPlainText="Copy plain"
      onPlainTextCopy={vi.fn()}
      onFork={onFork}
      addon={<ActionButton tooltipLabel="Like">+</ActionButton>}
    />,
  );
  const getRowLabels = () =>
    Array.from(container.querySelectorAll('button[aria-label]')).map((button) =>
      button.getAttribute('aria-label'),
    );

  return { getRowLabels, onFork };
};

describe('MessageActions', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('renders the menu with menu items', () => {
    const { button } = renderActions();

    fireEvent.click(button);

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('menu')).not.toBeNull();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
  });

  test('stays open while focus moves to an option', () => {
    const { button, onEdit } = renderActions();

    fireEvent.click(button);
    const option = screen.getByRole('menuitem', { name: 'Edit' });
    fireEvent.focusOut(button, { relatedTarget: option });

    expect(button.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(option);

    expect(onEdit).toHaveBeenCalledWith({
      id: '1',
      message: 'Hello',
      variant: 'user',
    });
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  test('closes when focus leaves the menu', () => {
    const { button } = renderActions();

    fireEvent.click(button);
    fireEvent.focusOut(button, { relatedTarget: document.body });

    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  test('closes on Escape and returns focus to the menu button', () => {
    const { button } = renderActions();

    fireEvent.click(button);
    const option = screen.getByRole('menuitem', { name: 'Edit' });
    option.focus();
    fireEvent.keyDown(option, { key: 'Escape' });

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });

  test('closes on a click outside', () => {
    const { button } = renderActions();

    fireEvent.click(button);
    fireEvent.mouseDown(document.body);

    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  test('opens on hover with a mouse only', () => {
    const { button } = renderActions();

    pointerEnter(button, 'touch');

    expect(button.getAttribute('aria-expanded')).toBe('false');

    pointerEnter(button, 'mouse');

    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  test('renders nothing without actions', () => {
    const { container } = customRender(
      <MessageActions
        variant="user"
        disableCopy
        disableModal
        disableDelete
        disableDownload
        disableEncryption
      />,
    );

    expect(container.querySelector('button')).toBeNull();
  });

  describe('a row that does not fit', () => {
    // В ряд шириной 100 входят два действия и кнопка «ещё»
    test('moves the last actions into the menu', () => {
      mockLayout({ row: 100 });
      const { getRowLabels } = renderReplyActions();

      expect(getRowLabels()).toEqual(['Copy', 'Regenerate', 'Menu']);

      fireEvent.click(screen.getByLabelText('Menu'));

      expect(
        screen.getAllByRole('menuitem').map((item) => item.textContent),
      ).toEqual(['+Like', 'Fork', 'Copy plain']);
    });

    test('runs a hidden action from the menu and closes it', () => {
      mockLayout({ row: 100 });
      const { onFork } = renderReplyActions();
      const button = screen.getByLabelText('Menu');

      fireEvent.click(button);
      fireEvent.click(screen.getByRole('menuitem', { name: 'Fork' }));

      expect(onFork).toHaveBeenCalledWith({ id: '1', message: 'Hello' });
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    test('shows the menu button for hidden actions without a menu', () => {
      mockLayout({ row: 100 });
      customRender(
        <MessageActions
          variant="assistant"
          disableModal
          disableDelete
          disableDownload
          disableEncryption
          menuAriaLabel="Menu"
          copyTooltipLabel="Copy"
          updateTooltipLabel="Regenerate"
          disableFork={false}
          forkTooltipLabel="Fork"
          addon={<ActionButton tooltipLabel="Like">+</ActionButton>}
        />,
      );

      fireEvent.click(screen.getByLabelText('Menu'));

      expect(
        screen.getAllByRole('menuitem').map((item) => item.textContent),
      ).toEqual(['+Like', 'Fork']);
    });

    test('returns the actions to the row when there is room again', () => {
      const notifyResize = mockResizeObserver();
      const layout = mockLayout({ row: 100 });
      const { getRowLabels } = renderReplyActions();

      expect(getRowLabels()).toHaveLength(3);

      // Строка стала шире: распор получил всё место, которое просил
      layout.reserve = 2 * BUTTON_WIDTH + 4;
      notifyResize();

      expect(getRowLabels()).toEqual([
        'Copy',
        'Regenerate',
        'Like',
        'Fork',
        'Menu',
      ]);
    });

    test('hides more actions when the row gets narrower', () => {
      const notifyResize = mockResizeObserver();
      const layout = mockLayout({ row: 1000 });
      const { getRowLabels } = renderReplyActions();

      expect(getRowLabels()).toHaveLength(5);

      layout.row = 70;
      notifyResize();

      expect(getRowLabels()).toEqual(['Copy', 'Menu']);
    });
  });

  describe('on a phone', () => {
    test('opens the menu as a sheet at the bottom of the screen', () => {
      mockPhone();
      const { button } = renderActions();

      fireEvent.click(button);
      const sheet = screen.getByRole('dialog', { name: 'Menu' });

      // Шторка стоит в body, а не у кнопки
      expect(sheet.parentElement).toBe(document.body);
      expect(sheet.textContent).toContain('Menu');
      expect(within(sheet).getAllByRole('menuitem')).toHaveLength(2);
    });

    test('runs an option of the sheet and closes it', () => {
      mockPhone();
      const { button, onEdit } = renderActions();

      fireEvent.click(button);
      const option = screen.getByRole('menuitem', { name: 'Edit' });
      // Нажатие переводит фокус на пункт: шторка не должна закрыться раньше
      fireEvent.focusOut(button, { relatedTarget: option });

      expect(button.getAttribute('aria-expanded')).toBe('true');

      fireEvent.click(option);

      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    test('does not open the sheet on hover', () => {
      mockPhone();
      const { button } = renderActions();

      pointerEnter(button, 'mouse');

      expect(button.getAttribute('aria-expanded')).toBe('false');
    });
  });

  test('does not submit a surrounding form', () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    customRender(
      <form onSubmit={onSubmit}>
        <MessageActions
          variant="assistant"
          menuAriaLabel="Menu"
          copyTooltipLabel="Copy"
          disableFork={false}
          forkTooltipLabel="Fork"
        />
      </form>,
    );

    fireEvent.click(screen.getByLabelText('Menu'));
    fireEvent.click(screen.getByLabelText('Copy'));
    fireEvent.click(screen.getByLabelText('Fork'));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
