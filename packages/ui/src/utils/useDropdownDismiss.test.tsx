import { useRef } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { trackGlobalListeners } from '@/ui/tests';
import {
  UseDropdownDismissOptions,
  useDropdownDismiss,
} from './useDropdownDismiss';

const Dropdown = ({
  enabled = true,
  onDismiss,
  options,
}: {
  enabled?: boolean;
  onDismiss: () => void;
  options?: UseDropdownDismissOptions;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useDropdownDismiss(ref, onDismiss, enabled, options);

  return (
    <>
      <div
        ref={ref}
        data-testid="inside"
      />
      <div data-testid="outside" />
    </>
  );
};

describe('useDropdownDismiss', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('closes on a press outside and on window blur', () => {
    const onDismiss = vi.fn();
    const { getByTestId } = render(<Dropdown onDismiss={onDismiss} />);

    fireEvent.mouseDown(getByTestId('inside'));
    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.mouseDown(getByTestId('outside'));
    fireEvent.blur(window);
    expect(onDismiss).toHaveBeenCalledTimes(2);
  });

  test('waits for the click with outsideEvent click', () => {
    const onDismiss = vi.fn();
    const { getByTestId } = render(
      <Dropdown
        onDismiss={onDismiss}
        options={{ outsideEvent: 'click' }}
      />,
    );

    fireEvent.mouseDown(getByTestId('outside'));
    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.click(getByTestId('outside'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('closes on a scroll outside only with closeOnScroll', () => {
    const onDismiss = vi.fn();
    const { getByTestId } = render(
      <Dropdown
        onDismiss={onDismiss}
        options={{ closeOnScroll: true }}
      />,
    );

    fireEvent.scroll(getByTestId('inside'));
    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.scroll(getByTestId('outside'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('does not listen while disabled', () => {
    const countListeners = trackGlobalListeners([
      'blur',
      'click',
      'mousedown',
      'scroll',
      'touchstart',
    ]);

    render(
      <Dropdown
        enabled={false}
        onDismiss={() => {}}
        options={{ outsideEvent: 'click', closeOnScroll: true }}
      />,
    );

    expect(countListeners()).toEqual({});
  });
});
