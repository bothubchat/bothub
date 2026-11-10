import { describe, expect, test, vi } from 'vitest';
import { useRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useOnClickOutside } from './useOnClickOutside';

const Box = ({
  enabled,
  onOutside,
}: {
  enabled: boolean;
  onOutside: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => onOutside(), enabled);

  return <div ref={ref}>inside</div>;
};

describe('useOnClickOutside', () => {
  test('calls the latest handler only for outside clicks', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { getByText, rerender } = render(
      <Box
        enabled
        onOutside={first}
      />,
    );

    fireEvent.mouseDown(getByText('inside'));
    expect(first).not.toHaveBeenCalled();

    rerender(
      <Box
        enabled
        onOutside={second}
      />,
    );
    fireEvent.mouseDown(document.body);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  test('does not listen while disabled', () => {
    const onOutside = vi.fn();
    render(
      <Box
        enabled={false}
        onOutside={onOutside}
      />,
    );

    fireEvent.mouseDown(document.body);
    expect(onOutside).not.toHaveBeenCalled();
  });
});
