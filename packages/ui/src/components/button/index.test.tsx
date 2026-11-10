import { createRef, useState } from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { THEMES, Theme } from '@/ui/theme';
import { useIconOrNull } from '@/ui/components/icon';
import { Button } from '.';

describe('button', () => {
  afterEach(() => {
    cleanup();
  });

  test('forwards the ref to the rendered element', () => {
    const ref = createRef<HTMLButtonElement>();
    const callbackRef = vi.fn();

    customRender(
      <>
        <Button ref={ref}>Object ref</Button>
        <Button
          ref={callbackRef}
          component="a"
          href="#link"
        >
          Callback ref
        </Button>
      </>,
    );

    expect(ref.current).toBe(screen.getByText('Object ref').closest('button'));
    expect(callbackRef).toHaveBeenCalledWith(
      screen.getByText('Callback ref').closest('a'),
    );
  });

  test('does not generate a class per color', () => {
    const setColor: { current: (color: string) => void } = {
      current: () => {},
    };
    const Host = () => {
      const [color, setColorState] = useState('#000001');
      setColor.current = setColorState;

      return <Button color={color}>Colored</Button>;
    };

    customRender(<Host />);
    const button = screen.getByRole('button');
    const { className } = button;

    for (let index = 2; index <= 20; index++) {
      const color = `#${index.toString(16).padStart(6, '0')}`;
      act(() => setColor.current(color));

      expect(button.className).toBe(className);
      expect(button.style.getPropertyValue('--bothub-button-color')).toBe(
        color,
      );
    }
  });

  test('keeps the style prop together with the color', () => {
    customRender(
      <Button
        color="#123456"
        style={{ marginTop: 4 }}
      >
        Styled
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button.style.marginTop).toBe('4px');
    expect(button.style.getPropertyValue('--bothub-button-color')).toBe(
      '#123456',
    );
  });

  test('blocks clicks on a disabled non-button component', () => {
    const onClick = vi.fn();

    customRender(
      <Button
        component="a"
        href="#link"
        disabled
        onClick={onClick}
      >
        Link
      </Button>,
    );
    const link = screen.getByText('Link').closest('a') as HTMLAnchorElement;

    expect(link.getAttribute('aria-disabled')).toBe('true');
    const notPrevented = fireEvent.click(link);
    expect(notPrevented).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('keeps clicks on an enabled non-button component', () => {
    const onClick = vi.fn();

    customRender(
      <Button
        component="span"
        onClick={onClick}
      >
        Span
      </Button>,
    );
    const span = screen.getByText('Span').closest('span[class]');

    expect(span?.getAttribute('aria-disabled')).toBeNull();
    fireEvent.click(span as Element);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('uses the bright accent icon fill in a custom scheme', () => {
    const base = THEMES.standard.dark;
    const customTheme: Theme = {
      ...base,
      scheme: 'custom',
      colors: {
        ...base.colors,
        accent: { ...base.colors.accent, primary: '#FFFFFF' },
        custom: {
          ...base.colors.custom,
          interface: { text: '#111111' },
        },
      },
    };
    let fill: string | undefined;
    const IconProbe = () => {
      fill = useIconOrNull()?.fill;

      return null;
    };

    customRender(<Button startIcon={<IconProbe />}>Custom</Button>, {
      providerProps: {
        children: null,
        theme: { scheme: 'custom', customTheme },
      },
    });

    expect(fill).toBe('#111111');
  });
});
