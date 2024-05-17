import React, {
  forwardRef, useCallback, useImperativeHandle, useRef 
} from 'react';
import {
  MessageList, 
  MessagesContainer, 
  MessagesContent, 
  MessagesScrollbarWrapper, 
  MessagesStart, 
  MessagesStyled 
} from './styled';
import { SetScrollFunction, ScrollbarRef, ScrollbarShadowsProps } from '@/ui/components/scrollbar';
import { MessagesProvider } from './context';

export interface MessagesRef {
  setScroll: SetScrollFunction;
}

export interface MessagesProps extends React.PropsWithChildren {
  className?: string;
  startRef?: (node?: Element | null | undefined) => void;
  scrollShadows?: ScrollbarShadowsProps;
}

export const Messages = forwardRef<MessagesRef, MessagesProps>(({ 
  className, startRef, scrollShadows, children 
}, ref) => {
  const scrollbarRef = useRef<ScrollbarRef>(null);

  const setScroll = useCallback<SetScrollFunction>((options) => (
    scrollbarRef.current?.setScroll(options ?? { side: 'bottom' })
  ), [scrollbarRef.current]);

  useImperativeHandle(ref, () => ({
    setScroll
  }), [setScroll]);

  return (
    <MessagesProvider
      setScroll={setScroll}
    >
      <MessagesStyled className={className}>
        <MessagesScrollbarWrapper
          ref={scrollbarRef}
          scrollShadows={scrollShadows}
          withStickyBottom
          defaultStickyBottom
        >
          <MessagesContent>
            <MessagesContainer>
              <MessagesStart
                ref={startRef}
              />
              <MessageList>
                {children}
              </MessageList>
            </MessagesContainer>
          </MessagesContent>
        </MessagesScrollbarWrapper>
      </MessagesStyled>
    </MessagesProvider>
  );
});

export * from './context';
