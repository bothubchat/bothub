import { memo, Profiler, useState } from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { CopyIcon } from '@/ui/icons/copy';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { DeleteChatIcon } from '@/ui/icons/delete-chat';
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

  describe('color', () => {
    const getColor = (container: HTMLElement) =>
      container.querySelector('svg')?.style.color;

    test('the parts are drawn with the color of the svg', () => {
      const { container } = customRender(<CheckSmallIcon />);

      expect(container.querySelector('path')?.getAttribute('fill')).toBe(
        'currentColor',
      );
      expect(getColor(container)).toBe('white');
    });

    test('fill wins over a provider, a provider over the default', () => {
      const { container } = customRender(
        <IconProvider fill="blue">
          <CheckSmallIcon />
          <CheckSmallIcon fill="red" />
        </IconProvider>,
      );
      const [provided, own] = container.querySelectorAll('svg');

      expect(provided.style.color).toBe('blue');
      expect(own.style.color).toBe('red');
    });

    test('outlined icons follow the provider stroke', () => {
      const { container } = customRender(
        <IconProvider
          fill="blue"
          stroke="green"
        >
          <DeleteChatIcon />
        </IconProvider>,
      );

      expect(getColor(container)).toBe('green');
    });

    test('a color may be a CSS variable', () => {
      const { container } = customRender(
        <CheckSmallIcon fill="var(--bothub-colors-base-white)" />,
      );

      expect(getColor(container)).toBe('var(--bothub-colors-base-white)');
    });

    test('fill none keeps the parts colored', () => {
      const { container } = customRender(<CheckSmallIcon fill="none" />);
      const svg = container.querySelector('svg');

      expect(svg?.getAttribute('fill')).toBe('none');
      expect(getColor(container)).toBe('white');
    });
  });
});
