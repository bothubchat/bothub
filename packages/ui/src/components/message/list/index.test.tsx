import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { customRender, trackGlobalListeners } from '@/ui/tests';
import { Message } from '@/ui/components/message';
import {
  SidebarChat,
  SidebarDropdownItem,
  SidebarListActions,
  SidebarProvider,
} from '@/ui/components/sidebar';
import { Messages } from '.';

class ResizeObserverStub {
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
    vi.stubGlobal('ResizeObserver', ResizeObserverStub);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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

    // resize слушают Scrollbar ленты и глобальные стили провайдера
    expect(countListeners()).toEqual({ 'window resize': 2 });
  });
});
