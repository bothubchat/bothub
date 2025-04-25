import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef
} from 'react';
import {
  MessageList,
  MessagesContainer,
  MessagesContent,
  MessagesScrollbarWrapper,
  MessagesStart,
  MessagesStyled
} from './styled';
import {
  SetScrollFunction,
  ScrollbarRef,
  ScrollbarShadowsProps
} from '@/ui/components/scrollbar';
import { MessagesProvider, MessagesScrollProvider } from './context';

export interface MessagesRef {
  element: Element | null;
  setScroll: SetScrollFunction;
}

export interface MessagesProps extends React.PropsWithChildren {
  className?: string;
  fullWidth: boolean;
  startRef?: (node?: Element | null | undefined) => void;
  scrollShadows?: ScrollbarShadowsProps;
}

export const Messages = forwardRef<MessagesRef, MessagesProps>(
  (
    { fullWidth = false, className, startRef, scrollShadows, children },
    ref
  ) => {
    const scrollbarRef = useRef<ScrollbarRef>(null);

    const setScroll = useCallback<SetScrollFunction>(
      (options) =>
        scrollbarRef.current?.setScroll(options ?? { side: 'bottom' }),
      [scrollbarRef.current]
    );

    useImperativeHandle(
      ref,
      () => ({
        element: scrollbarRef.current?.element ?? null,
        setScroll
      }),
      [setScroll, scrollbarRef.current]
    );

    return (
      <MessagesProvider setScroll={setScroll}>
        <MessagesStyled className={className}>
          <MessagesScrollbarWrapper
            ref={scrollbarRef}
            scrollShadows={scrollShadows}
            withStickyBottom
            defaultStickyBottom
          >
            <MessagesContent>
              <MessagesContainer $fullWidth={fullWidth}>
                <MessagesStart ref={startRef} />
                <MessagesScrollProvider scrollbarRef={scrollbarRef}>
                  <MessageList>{children}</MessageList>
                </MessagesScrollProvider>
              </MessagesContainer>
            </MessagesContent>
          </MessagesScrollbarWrapper>
        </MessagesStyled>
      </MessagesProvider>
    );
  }
);

export * from './context';
