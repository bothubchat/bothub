import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Message, MessageActionButton, MessageProps } from '.';

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

const TIME = new Date(2026, 0, 1, 9, 5).getTime();

const renderMessage = (props: MessageProps) =>
  customRender(
    <Message
      content="Hello"
      copyTooltipLabel="Copy"
      updateTooltipLabel="Regenerate"
      forkTooltipLabel="Fork"
      disableFork={false}
      onCopy={vi.fn()}
      onUpdate={vi.fn()}
      onFork={vi.fn()}
      {...props}
    >
      Hello
    </Message>,
  );

const getLabels = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('button[aria-label]')).map((button) =>
    button.getAttribute('aria-label'),
  );

describe('Message frame', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  // Порядок из макета: копировать, повторить, свои действия, форк
  test('puts the actions of the consumer between regenerate and fork', () => {
    const { container } = renderMessage({
      variant: 'assistant',
      actionsAddon: (
        <MessageActionButton
          tooltipLabel="Like"
          aria-pressed
          active
        >
          +
        </MessageActionButton>
      ),
    });

    expect(getLabels(container)).toEqual([
      'Copy',
      'Regenerate',
      'Like',
      'Fork',
    ]);
    expect(screen.getByLabelText('Like').getAttribute('aria-pressed')).toBe(
      'true',
    );
  });

  // Стоимость — одним блоком с действиями, время — у дальнего края строки
  test('puts the cost right after the actions and the time last', () => {
    const { container } = renderMessage({
      variant: 'assistant',
      timestamp: TIME,
      transaction: '1 820 CAPS',
    });

    const time = screen.getByText('09:05');
    const cost = screen.getByText('1 820 CAPS');
    const order = Array.from(container.querySelectorAll('*'));

    expect(time.closest('[data-message-reveal]')).toBeNull();
    expect(cost.hasAttribute('data-message-reveal')).toBe(false);
    expect(order.indexOf(screen.getByLabelText('Fork'))).toBeLessThan(
      order.indexOf(cost),
    );
    expect(container.textContent).toContain('1 820 CAPS09:05');
  });

  test('reveals the cost of a user message on hover with the rest', () => {
    renderMessage({
      variant: 'user',
      timestamp: TIME,
      transaction: '12 CAPS',
    });

    expect(
      screen.getByText('12 CAPS').hasAttribute('data-message-reveal'),
    ).toBe(true);
  });

  test('names the menu button for a screen reader', () => {
    renderMessage({
      variant: 'assistant',
      menuText: 'Actions',
      copyPlainText: 'Copy plain',
    });

    expect(screen.getByLabelText('Actions').getAttribute('aria-haspopup')).toBe(
      'menu',
    );
  });

  // Под пузырём пользователя пусто, пока на него не навели
  test('reveals the actions and the time of a user message on hover', () => {
    renderMessage({ variant: 'user', timestamp: TIME });

    expect(
      screen.getByLabelText('Copy').closest('[data-message-reveal]'),
    ).not.toBeNull();
    expect(screen.getByText('09:05').hasAttribute('data-message-reveal')).toBe(
      true,
    );
  });

  // «Отправляется», «не отправлено» должны быть видны без наведения
  test('always shows the state label of a user message', () => {
    renderMessage({
      variant: 'user',
      timestamp: TIME,
      edited: true,
      editedText: 'not sent',
    });

    expect(
      screen.getByText('not sent').closest('[data-message-reveal]'),
    ).toBeNull();
  });

  // Пустой блок кнопок добавлял сообщению лишний отступ снизу
  test('renders the buttons block only when there are buttons', () => {
    const plain = renderMessage({ variant: 'assistant' });
    const withButtons = renderMessage({
      variant: 'assistant',
      buttons: <span>Continue</span>,
    });
    // Корень сообщения → колонка: само сообщение и блок кнопок под ним
    const countParts = (container: HTMLElement) =>
      container.firstElementChild?.firstElementChild?.childElementCount;

    expect(countParts(plain.container)).toBe(1);
    expect(countParts(withButtons.container)).toBe(2);
    expect(withButtons.container.textContent).toContain('Continue');
  });

  // Файл — отдельная карточка над пузырём, а не часть его текста
  test('puts the attachments above the text, outside the bubble', () => {
    const { container } = renderMessage({
      variant: 'user',
      attachments: <span>contract.pdf</span>,
    });
    const file = screen.getByText('contract.pdf');
    const content = container.querySelector('[data-message-content]')!;

    // Карточка файла стоит в разметке раньше текста и не внутри него
    const order = Array.from(container.querySelectorAll('*'));

    expect(content.contains(file)).toBe(false);
    expect(order.indexOf(file)).toBeLessThan(order.indexOf(content));
  });
});
