import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { customRender } from '@/ui/tests/customRender';
import { Message } from './index';

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

describe('Message actions callbacks', () => {
  test('calls onResend and does not call onUpdate for resend action', async () => {
    const user = userEvent.setup();
    const onResend = vi.fn();
    const onUpdate = vi.fn();

    customRender(
      <Message
        id="msg-1"
        content="hello"
        variant="user"
        resendText="Resend"
        menuAriaLabel="Actions"
        onResend={onResend}
        onUpdate={onUpdate}
      >
        hello
      </Message>,
    );

    await user.click(screen.getByLabelText('Actions'));
    await user.click(await screen.findByText('Resend'));

    expect(onResend).toHaveBeenCalledTimes(1);
    expect(onResend).toHaveBeenCalledWith({
      id: 'msg-1',
      message: 'hello',
    });
    expect(onUpdate).not.toHaveBeenCalled();
  });

  test('calls onUpdate for update action', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();

    customRender(
      <Message
        id="msg-2"
        content="assistant response"
        variant="assistant"
        updateTooltipLabel="Update"
        onUpdate={onUpdate}
      >
        assistant response
      </Message>,
    );

    await user.click(screen.getByLabelText('Update'));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith({
      id: 'msg-2',
      message: 'assistant response',
    });
  });
});
