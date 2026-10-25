import { describe, test, expect, afterEach, beforeAll, vi } from 'vitest';
import { useState } from 'react';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { SelectField, SelectFieldDataItem } from './index';

const data: SelectFieldDataItem[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta (2)' },
  { value: 'c', label: 'Gamma' },
];

const getTrigger = () => document.querySelector('[data-test="trigger"]')!;

const getOption = (label: string) =>
  document.querySelector(`[data-test="${label}"]`);

const open = () => {
  fireEvent.click(getTrigger());
};

describe('SelectField', () => {
  beforeAll(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}

        unobserve() {}

        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('mounts options on the first open', () => {
    customRender(
      <SelectField
        dataTest="trigger"
        data={data}
      />,
    );

    expect(getOption('Alpha')).toBeNull();

    open();
    expect(getOption('Alpha')).not.toBeNull();
    expect(getOption('Alpha')!.closest('[inert]')).toBeNull();

    open();
    expect(getOption('Alpha')!.closest('[inert]')).not.toBeNull();
  });

  test('closed modal is inert', () => {
    customRender(
      <SelectField
        dataTest="trigger"
        data={data}
        search
        searchPlaceholder="search"
      />,
    );

    const search = screen.getByPlaceholderText('search');
    const modal = search.closest('[inert]');
    expect(modal).not.toBeNull();

    open();
    expect(search.closest('[inert]')).toBeNull();
  });

  test('does not listen to window resize while closed', () => {
    const addListener = vi.spyOn(window, 'addEventListener');
    const countResizeListeners = () =>
      addListener.mock.calls.filter(([type]) => type === 'resize').length;

    customRender(<div />);
    const baseline = countResizeListeners();
    cleanup();
    addListener.mockClear();

    customRender(
      <SelectField
        dataTest="trigger"
        data={data}
        contentHeight={300}
      />,
    );

    expect(countResizeListeners()).toBe(baseline);
  });

  test('selects an option and calls onChange', () => {
    const onChange = vi.fn();

    customRender(
      <SelectField
        dataTest="trigger"
        data={data}
        onChange={onChange}
      />,
    );

    open();
    fireEvent.click(getOption('Gamma')!);

    expect(onChange).toHaveBeenCalledWith(data[2]);
    expect(getTrigger().textContent).toContain('Gamma');
  });

  test('clear button clears the value without opening the modal', async () => {
    const onChange = vi.fn();
    const onSelectClick = vi.fn();

    customRender(
      <SelectField
        dataTest="trigger"
        data={data}
        value={data[0]}
        onChange={onChange}
        onSelectClick={onSelectClick}
        clearable
      />,
    );

    const clearButton = getTrigger().querySelector('button')!;
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith(null);
    expect(onSelectClick).not.toHaveBeenCalled();
    expect(getOption('Alpha')).toBeNull();
  });

  test('search filters options literally and case-insensitively', async () => {
    customRender(
      <SelectField
        dataTest="trigger"
        data={data}
        search
        searchPlaceholder="search"
      />,
    );

    open();
    fireEvent.change(screen.getByPlaceholderText('search'), {
      target: { value: '(2' },
    });

    await waitFor(() => expect(getOption('Alpha')).toBeNull());
    expect(getOption('Beta (2)')).not.toBeNull();

    fireEvent.change(screen.getByPlaceholderText('search'), {
      target: { value: 'gAm' },
    });

    await waitFor(() => expect(getOption('Gamma')).not.toBeNull());
    expect(getOption('Beta (2)')).toBeNull();
  });

  test('multiple mode highlights the selected options', () => {
    customRender(
      <SelectField
        dataTest="trigger"
        data={data}
        multiple
        value={[{ value: 'b', label: 'Beta (2)' }]}
      />,
    );

    open();

    const alpha = getOption('Alpha')!;
    const beta = getOption('Beta (2)')!;
    const gamma = getOption('Gamma')!;

    expect(alpha.className).toBe(gamma.className);
    expect(beta.className).not.toBe(alpha.className);
  });

  test('multiple mode does not duplicate an item from new data', () => {
    const onChange = vi.fn();

    customRender(
      <SelectField
        dataTest="trigger"
        data={data.map((item) =>
          typeof item === 'string' ? item : { ...item },
        )}
        multiple
        value={[{ value: 'a', label: 'Alpha' }]}
        onChange={onChange}
      />,
    );

    open();
    fireEvent.click(getOption('Alpha')!);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toHaveLength(1);
  });

  test('calls the latest onClose', () => {
    const first = vi.fn();
    const second = vi.fn();

    const { rerender } = customRender(
      <SelectField
        dataTest="trigger"
        data={data}
        onClose={first}
      />,
    );

    rerender(
      <TestProvider>
        <SelectField
          dataTest="trigger"
          data={data}
          onClose={second}
        />
      </TestProvider>,
    );

    open();
    fireEvent.click(getOption('Alpha')!);

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  test('switching inputValue between controlled and uncontrolled does not crash', () => {
    const Host = () => {
      const [controlled, setControlled] = useState(false);

      return (
        <>
          <button
            type="button"
            onClick={() => setControlled(true)}
          >
            control
          </button>
          <SelectField
            dataTest="trigger"
            data={data}
            enableInput
            inputValue={controlled ? 'controlled' : undefined}
          />
        </>
      );
    };

    customRender(<Host />);

    act(() => {
      fireEvent.click(screen.getByText('control'));
    });

    expect(screen.getByDisplayValue('controlled')).not.toBeNull();
  });

  test('passes props to nested collapse options', () => {
    const onOptionClick = vi.fn();

    customRender(
      <SelectField
        dataTest="trigger"
        data={[
          {
            id: 'group',
            type: 'collapse',
            label: 'Group',
            open: true,
            data: [{ value: 'nested', label: 'Nested' }],
          },
        ]}
        onOptionClick={onOptionClick}
      />,
    );

    open();
    fireEvent.click(getOption('Group')!.querySelector('div')!);
    fireEvent.click(getOption('Nested')!);

    expect(onOptionClick).toHaveBeenCalledWith({
      value: 'nested',
      label: 'Nested',
    });
  });

  test('nested collapse options respect disableSelect', () => {
    customRender(
      <SelectField
        dataTest="trigger"
        data={[
          {
            id: 'group',
            type: 'collapse',
            label: 'Group',
            data: [
              { value: 'x', label: 'X' },
              { value: 'y', label: 'Y' },
            ],
          },
        ]}
        value={{ value: 'x', label: 'X' }}
        disableSelect
      />,
    );

    open();
    fireEvent.click(getOption('Group')!.querySelector('div')!);

    expect(getOption('X')!.className).toBe(getOption('Y')!.className);
  });
});
