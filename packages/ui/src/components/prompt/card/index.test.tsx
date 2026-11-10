import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { PromptCard } from './index';

describe('PromptCard', () => {
  afterEach(() => {
    cleanup();
  });

  test('shows the copied icon after a click, not on focus', () => {
    const onCopy = vi.fn();

    const { container } = customRender(
      <PromptCard onCopy={onCopy}>Write a poem</PromptCard>,
    );

    const card = container.firstElementChild as HTMLElement;
    const getIconPaths = () =>
      [...card.querySelectorAll('svg path')]
        .map((path) => path.getAttribute('d'))
        .join();
    const copyIcon = getIconPaths();

    fireEvent.focus(card);
    expect(getIconPaths()).toBe(copyIcon);

    fireEvent.click(screen.getByText('Write a poem'));
    expect(onCopy).toHaveBeenCalledWith('Write a poem');
    expect(getIconPaths()).not.toBe(copyIcon);
  });
});
