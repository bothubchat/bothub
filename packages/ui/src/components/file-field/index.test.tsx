import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { FileField } from './index';

const a = new File(['a'], 'a.txt', { type: 'text/plain' });
const b = new File(['b'], 'b.pdf', { type: 'application/pdf' });

const getInput = (container: HTMLElement) =>
  container.querySelector('input[type="file"]') as HTMLInputElement;

describe('FileField', () => {
  afterEach(() => {
    cleanup();
  });

  test('keeps selected files when uncontrolled and reports them', () => {
    const onChange = vi.fn();
    const { container, getByText } = customRender(
      <FileField onChange={onChange} />,
    );

    fireEvent.change(getInput(container), { target: { files: [a] } });
    fireEvent.change(getInput(container), { target: { files: [b] } });

    expect(onChange).toHaveBeenLastCalledWith([a, b]);
    expect(getByText('a.txt')).not.toBeNull();
    expect(getByText('b.pdf')).not.toBeNull();
  });

  test('switches between uncontrolled and controlled without crashing', () => {
    const { rerender, queryByText } = customRender(<FileField />);

    rerender(
      <TestProvider>
        <FileField files={[a]} />
      </TestProvider>,
    );
    expect(queryByText('a.txt')).not.toBeNull();

    rerender(
      <TestProvider>
        <FileField />
      </TestProvider>,
    );
    expect(queryByText('a.txt')).toBeNull();
  });

  test('keeps the input focusable', () => {
    const { container } = customRender(<FileField />);
    const input = getInput(container);

    input.focus();
    expect(document.activeElement).toBe(input);
  });
});
