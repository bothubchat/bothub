import { describe, test, expect, afterEach, vi } from 'vitest';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { Tooltip } from '@/ui/components/tooltip';
import { RangeField } from './index';

describe('RangeField', () => {
  afterEach(() => {
    cleanup();
  });

  test('keeps its own value and reports changes when uncontrolled', () => {
    const onChange = vi.fn();
    customRender(
      <RangeField
        min={0}
        max={10}
        onChange={onChange}
      />,
    );

    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight', keyCode: 39 });

    expect(onChange).toHaveBeenCalledWith(1);
    expect(slider.getAttribute('aria-valuenow')).toBe('1');
  });

  test('switches between uncontrolled and controlled without crashing', () => {
    const { rerender } = customRender(
      <RangeField
        min={0}
        max={10}
      />,
    );
    expect(screen.getByRole('slider').getAttribute('aria-valuenow')).toBe('0');

    rerender(
      <TestProvider>
        <RangeField
          min={0}
          max={10}
          value={5}
        />
      </TestProvider>,
    );
    expect(screen.getByRole('slider').getAttribute('aria-valuenow')).toBe('5');

    rerender(
      <TestProvider>
        <RangeField
          min={0}
          max={10}
        />
      </TestProvider>,
    );
    expect(screen.getByRole('slider')).not.toBeNull();
  });

  test('shows the outer tooltip when the label is hovered', () => {
    customRender(
      <Tooltip label="Label hint">
        <RangeField label="Temperature" />
      </Tooltip>,
    );

    fireEvent.pointerEnter(screen.getByText('Temperature'));
    expect(screen.getByText('Label hint')).not.toBeNull();
  });
});
