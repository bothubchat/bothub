import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { createClipboardData, customRender } from '@/ui/tests';
import { InputMessage } from '.';

const image = new File(['png'], 'image.png', { type: 'image/png' });

const renderInput = (
  props: Partial<React.ComponentProps<typeof InputMessage>> = {},
) => {
  const onFilesChange = vi.fn();

  customRender(
    <InputMessage
      placeholder="Сообщение"
      files={[]}
      onFilesChange={onFilesChange}
      {...props}
    />,
  );
  // useFiles синхронизирует контролируемые files при монтировании
  onFilesChange.mockClear();

  return {
    onFilesChange,
    textarea: screen.getByPlaceholderText('Сообщение'),
  };
};

describe('InputMessage paste', () => {
  afterEach(cleanup);

  test('attaches image copied from browser', async () => {
    const { onFilesChange, textarea } = renderInput();

    const notPrevented = fireEvent.paste(textarea, {
      clipboardData: createClipboardData({
        files: [image],
        data: { 'text/html': '<img src="https://example.com/cat.png">' },
      }),
    });

    expect(notPrevented).toBe(false);
    await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
    expect(onFilesChange.mock.calls[0][0]).toEqual([
      expect.objectContaining({ name: 'image.png', native: image }),
    ]);
  });

  test('keeps default text paste for rich text with preview image', () => {
    const { onFilesChange, textarea } = renderInput();

    const notPrevented = fireEvent.paste(textarea, {
      clipboardData: createClipboardData({
        files: [image],
        data: {
          'text/plain': 'Выручка',
          'text/html': '<p>Выручка</p>',
        },
      }),
    });

    expect(notPrevented).toBe(true);
    expect(onFilesChange).not.toHaveBeenCalled();
  });

  test('ignores pasted files when upload is disabled', () => {
    const { onFilesChange, textarea } = renderInput({
      uploadFileDisabled: true,
    });

    const notPrevented = fireEvent.paste(textarea, {
      clipboardData: createClipboardData({ files: [image] }),
    });

    expect(notPrevented).toBe(true);
    expect(onFilesChange).not.toHaveBeenCalled();
  });
});
