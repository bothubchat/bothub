import { memo, Profiler, useState } from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { CopyIcon } from '@/ui/icons/copy';
import { TooltipProvider } from '@/ui/components/tooltip';
import { IconProvider, useIconOrNull } from '.';

describe('icon', () => {
  afterEach(() => {
    cleanup();
  });

  test('provider size overrides the default icon size', () => {
    const { container } = customRender(
      <IconProvider size={24}>
        <CopyIcon />
      </IconProvider>,
    );
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  test('uses the icon size without a provider', () => {
    const { container } = customRender(<CopyIcon size={12} />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('width')).toBe('12');
    expect(svg?.getAttribute('height')).toBe('12');
  });

  test('subscribes to the tooltip context only with enableTooltip', () => {
    let plainRenders = 0;
    let tooltipRenders = 0;
    const PlainIcon = memo(() => (
      <Profiler
        id="plain"
        onRender={() => {
          plainRenders++;
        }}
      >
        <CopyIcon data-testid="plain" />
      </Profiler>
    ));
    const TooltipIcon = memo(() => (
      <Profiler
        id="tooltip"
        onRender={() => {
          tooltipRenders++;
        }}
      >
        <CopyIcon
          data-testid="tooltip"
          enableTooltip
        />
      </Profiler>
    ));
    const onMouseEnter = vi.fn();
    let rerenderProvider: () => void = () => {};
    const Host = () => {
      const [, setTick] = useState(0);
      rerenderProvider = () => setTick((tick) => tick + 1);

      return (
        <TooltipProvider
          handleTooltipMouseEnter={(event) => onMouseEnter(event)}
          handleTooltipMouseLeave={() => {}}
          handleTooltipPointerMove={() => {}}
        >
          <PlainIcon />
          <TooltipIcon />
        </TooltipProvider>
      );
    };

    customRender(<Host />);
    act(() => rerenderProvider());

    expect(plainRenders).toBe(1);
    expect(tooltipRenders).toBe(2);

    fireEvent.mouseEnter(screen.getByTestId('plain'));
    expect(onMouseEnter).not.toHaveBeenCalled();
    fireEvent.mouseEnter(screen.getByTestId('tooltip'));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  test('keeps the provider value stable for the same props', () => {
    const values = new Set<unknown>();
    const Consumer = memo(() => {
      values.add(useIconOrNull());

      return null;
    });
    let rerender: () => void = () => {};
    const Host = () => {
      const [, setTick] = useState(0);
      rerender = () => setTick((tick) => tick + 1);

      return (
        <IconProvider
          size={20}
          fill="#fff"
        >
          <Consumer />
        </IconProvider>
      );
    };

    customRender(<Host />);
    act(() => rerender());

    expect(values.size).toBe(1);
  });
});
