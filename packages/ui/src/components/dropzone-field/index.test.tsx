import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { DropzoneField } from './index';

const file = new File(['a'], 'a.txt', { type: 'text/plain' });

const getInput = (container: HTMLElement) =>
  container.querySelector('input[type="file"]') as HTMLInputElement;

describe('DropzoneField', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders the error instead of leaking it to the DOM', () => {
    const { container, getByText } = customRender(
      <DropzoneField error="Too big" />,
    );

    expect(getByText('Too big')).not.toBeNull();
    expect(container.querySelector('[error]')).toBeNull();
    expect(getInput(container).getAttribute('aria-invalid')).toBe('true');
  });

  test('puts the id on the input', () => {
    const { container } = customRender(<DropzoneField id="upload" />);

    expect(container.querySelectorAll('#upload')).toHaveLength(1);
    expect(getInput(container).id).toBe('upload');
  });

  test('calls onChange when uncontrolled and lets the same file be chosen again', () => {
    const onChange = vi.fn();
    const { container } = customRender(<DropzoneField onChange={onChange} />);
    const input = getInput(container);

    fireEvent.change(input, { target: { files: [file] } });
    expect(onChange).toHaveBeenLastCalledWith([file]);
    expect(input.value).toBe('');
  });

  test('ignores dropped files when disabled', () => {
    const onChange = vi.fn();
    const { container, rerender } = customRender(
      <DropzoneField
        disabled
        files={[]}
        onChange={onChange}
      />,
    );
    const root = container.querySelector('[data-dragged]') as HTMLElement;

    fireEvent.drop(root, { dataTransfer: { files: [file] } });
    expect(onChange).not.toHaveBeenCalled();

    rerender(
      <TestProvider>
        <DropzoneField
          files={[]}
          onChange={onChange}
        />
      </TestProvider>,
    );
    fireEvent.drop(root, { dataTransfer: { files: [file] } });
    expect(onChange).toHaveBeenCalledWith([file]);
  });
});
