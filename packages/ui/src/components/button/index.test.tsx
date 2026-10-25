import { useState } from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { act, cleanup, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Button } from '.';

describe('button', () => {
  afterEach(() => {
    cleanup();
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
});
