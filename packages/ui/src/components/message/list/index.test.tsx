import { createRef } from 'react';
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { customRender, trackGlobalListeners } from '@/ui/tests';
import { Message } from '@/ui/components/message';
import {
  SidebarChat,
  SidebarDropdownItem,
  SidebarListActions,
  SidebarProvider,
} from '@/ui/components/sidebar';
import { Messages, MessagesRef } from '.';

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

// Сайдбар на 20 чатов с меню и лента из 20 сообщений с подсказками действий
const TypicalChat = () => (
  <>
    <SidebarProvider
      isOpen
      isEdit={false}
      scrollbarElement={null}
      setIsEdit={() => {}}
      setIsOpen={() => {}}
    >
      {Array.from({ length: 20 }, (_, index) => (
        <SidebarChat
          key={index}
          id={`chat-${index}`}
          name={`Chat ${index}`}
          actions={
            <SidebarListActions>
              <SidebarDropdownItem>Rename</SidebarDropdownItem>
              <SidebarDropdownItem>Delete</SidebarDropdownItem>
            </SidebarListActions>
          }
        />
      ))}
    </SidebarProvider>
    <Messages>
      {Array.from({ length: 20 }, (_, index) => (
        <Message
          key={index}
          id={`message-${index}`}
          variant={index % 2 === 0 ? 'user' : 'assistant'}
          content={`Message ${index}`}
          copyTooltipLabel="Copy"
          updateTooltipLabel="Regenerate"
          copyPlainText="Copy as text"
          editText="Edit"
          deleteText="Delete"
          onCopy={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          onUpdate={() => {}}
        >
          {`Message ${index}`}
        </Message>
      ))}
    </Messages>
  </>
);

describe('Messages', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('exposes the scroll element through the ref', () => {
    const ref = createRef<MessagesRef>();
    customRender(
      <Messages ref={ref}>
        <div>Hello</div>
      </Messages>,
    );

    expect(ref.current?.element?.contains(screen.getByText('Hello'))).toBe(
      true,
    );
  });

  test('scrolls to the bottom through the ref', () => {
    const ref = createRef<MessagesRef>();
    customRender(
      <Messages ref={ref}>
        <div>Hello</div>
      </Messages>,
    );
    const element = ref.current!.element as HTMLElement;
    Object.defineProperty(element, 'scrollHeight', { value: 500 });

    ref.current!.setScroll();

    expect(element.scrollTop).toBe(500);
  });

  test('a typical chat keeps global listeners only for the feed', () => {
    const countListeners = trackGlobalListeners([
      'blur',
      'click',
      'mouseleave',
      'resize',
      'scroll',
    ]);

    customRender(<TypicalChat />);

    // resize слушают только глобальные стили провайдера: Scrollbar ленты
    // следит за размером через ResizeObserver
    expect(countListeners()).toEqual({ 'window resize': 1 });
  });
});
