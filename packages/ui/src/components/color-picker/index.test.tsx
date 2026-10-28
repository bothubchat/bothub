import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { ColorPicker } from './index';

// The first selector sits in the saturation/brightness area
const getArea = () =>
  document.querySelector<HTMLElement>('[style*="--selector-x"]')!
    .parentElement!;

describe('ColorPicker', () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('does not report a color when the menu opens', () => {
    const onChange = vi.fn();
    customRender(
      <ColorPicker
        color="#1c64f2"
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByText('#1c64f2'));

    expect(getArea()).not.toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('reports picked colors to the latest onChange', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = customRender(
      <ColorPicker
        color="#1c64f2"
        onChange={first}
      />,
    );
    fireEvent.click(screen.getByText('#1c64f2'));

    rerender(
      <TestProvider>
        <ColorPicker
          color="#1c64f2"
          onChange={second}
        />
      </TestProvider>,
    );

    // Top right corner of the area: full saturation and brightness
    fireEvent.mouseDown(getArea(), { clientX: 100, clientY: 0 });
    fireEvent.mouseUp(document, { clientX: 100, clientY: 0 });

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    expect(second.mock.calls[0][0]).toMatch(/^#[\dA-F]{6}$/);
  });

  test('stops dragging when closed in the middle of a drag', () => {
    const onChange = vi.fn();
    customRender(
      <ColorPicker
        color="#1c64f2"
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText('#1c64f2'));

    fireEvent.mouseDown(getArea(), { clientX: 10, clientY: 10 });
    expect(onChange).toHaveBeenCalledTimes(1);

    // Clicking outside closes the menu
    fireEvent.click(document.body);
    fireEvent.mouseUp(document, { clientX: 50, clientY: 50 });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
