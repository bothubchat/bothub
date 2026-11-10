import React, { useState } from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent } from '@testing-library/react';
import type { Components } from 'react-markdown';
import { customRender } from '@/ui/tests';
import { GeneratedDocumentBlock } from '.';

describe('GeneratedDocumentBlock', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  test('does not render the markdown again for the same code', () => {
    const renderParagraph = vi.fn(({ children }) => <p>{children}</p>);
    const components: Components = { p: renderParagraph };
    let rerender: () => void = () => {};

    const Parent = () => {
      const [, setCount] = useState(0);
      rerender = () => setCount((count) => count + 1);
      return (
        <GeneratedDocumentBlock
          code="Документ"
          baseComponents={components}
        />
      );
    };

    customRender(<Parent />);
    act(() => rerender());

    expect(renderParagraph).toHaveBeenCalledTimes(1);
  });

  test('clears the copied state timer on unmount', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('ClipboardItem', class {});
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { write: vi.fn(() => Promise.resolve()) },
    });

    const { getByRole, unmount } = customRender(
      <GeneratedDocumentBlock
        code="Документ"
        copyLabel="Копировать"
      />,
    );
    const button = getByRole('button');
    expect(button.getAttribute('type')).toBe('button');

    await act(async () => {
      fireEvent.click(button);
    });
    expect(button.textContent).toBe('✓');

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
