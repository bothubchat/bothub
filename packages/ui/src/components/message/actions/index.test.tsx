import { describe, test, expect, afterEach, vi } from 'vitest';
import {
  cleanup,
  createEvent,
  fireEvent,
  screen,
} from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageActions } from '.';

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

describe('MessageActions', () => {
  afterEach(() => {
    cleanup();
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
});
