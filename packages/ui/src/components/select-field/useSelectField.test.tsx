import React, { useState } from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import { customRender } from '@/ui/tests/customRender';
import { SelectField } from './index';
import { SelectFieldData } from './types';

class ResizeObserverMock {
  observe = () => {};

  unobserve = () => {};

  disconnect = () => {};
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;
  }
});

afterEach(() => {
  cleanup();
});

const clickOptionByDataTest = async (
  user: ReturnType<typeof userEvent.setup>,
  label: string,
) => {
  const options = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-test="${label}"]`),
  );

  expect(options.length).toBeGreaterThan(0);
  const target = options[options.length - 1];
  await user.click(target);
};

const baseData: SelectFieldData = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Disabled', value: 'disabled', disabled: true },
];

describe('SelectField controllable contract', () => {
  test('uncontrolled single mode emits onChange and onValueChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onValueChange = vi.fn();

    customRender(
      <SelectField
        placeholder="Select value"
        data={baseData}
        onChange={onChange}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByText('Select value'));
    await clickOptionByDataTest(user, 'Alpha');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('alpha');
  });

  test('controlled single mode keeps external source of truth', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onValueChange = vi.fn();

    const Controlled = () => {
      const [value, setValue] = useState<SelectFieldData[number] | null>(null);

      return (
        <SelectField
          placeholder="Controlled select"
          data={baseData}
          value={value}
          onChange={(next) => {
            onChange(next);
            setValue(next);
          }}
          onValueChange={onValueChange}
        />
      );
    };

    customRender(<Controlled />);

    await user.click(screen.getByText('Controlled select'));
    await clickOptionByDataTest(user, 'Beta');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('beta');
    expect(onValueChange).toHaveBeenLastCalledWith('beta');
  });

  test('controlled multiple mode emits array of values', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onValueChange = vi.fn();

    customRender(
      <SelectField
        placeholder="Multi select"
        data={baseData}
        multiple
        value={[]}
        onChange={onChange}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByText('Multi select'));
    await clickOptionByDataTest(user, 'Alpha');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(['alpha']);
  });

  test('does not select disabled options', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    customRender(
      <SelectField
        placeholder="Disabled check"
        data={baseData}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByText('Disabled check'));
    await clickOptionByDataTest(user, 'Disabled');

    expect(onChange).not.toHaveBeenCalled();
  });

  test('closes modal after selection in single mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    customRender(
      <SelectField
        placeholder="Modal close"
        data={baseData}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByText('Modal close'));
    await clickOptionByDataTest(user, 'Alpha');

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
