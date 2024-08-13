import React, {
  useCallback, useRef, useState, useEffect, forwardRef, useImperativeHandle
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollbarContent, ScrollbarShadows, ScrollbarStyled } from './styled';
import {
  SetScrollFunction,
  SetScrollOptions, 
  ScrollbarOverflow, 
  ScrollbarRef, 
  ScrollbarShadowsProps, 
  ScrollbarVariant 
} from './types';
import { ScrollbarProvider } from './context';

export interface ScrollbarProps extends React.PropsWithChildren {
  className?: string;
  scrollbarClassName?: string; 
  variant?: ScrollbarVariant;
  size?: number;
  scrollShadows?: ScrollbarShadowsProps;
  scrollLocked?: SetScrollOptions;
  overflow?: ScrollbarOverflow;
  disabled?: boolean;
  disableShadows?: boolean;
  withStickyBottom?: boolean;
  defaultStickyBottom?: boolean;
}

export const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>(({ 
  className, scrollbarClassName, variant = 'primary', size = 6, scrollShadows, scrollLocked, overflow = 'auto', disabled = false, disableShadows = false, children, defaultStickyBottom = false, withStickyBottom = false,
}, ref) => {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [isTop, setIsTop] = useState<boolean>(false);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const advancedMode = !!scrollShadows;
  const lockedMode = !!scrollLocked;
  const [sticky, setSticky] = useState<boolean>(defaultStickyBottom);
  const [previousScrollTop, setPreviousScrollTop] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;

    if (scrollbarEl === null) {
      return;
    }

    const {
      scrollTop, scrollHeight, clientHeight,
      scrollLeft, scrollWidth, clientWidth
    } = scrollbarEl;

    setIsLeft(scrollLeft !== 0);
    setIsRight(Math.round(scrollLeft) + 1 < scrollWidth - clientWidth);
    setIsTop(scrollTop !== 0);
    setIsBottom(Math.round(scrollTop) + 1 < scrollHeight - clientHeight);

    const isUpScroll = previousScrollTop > scrollbarEl.scrollTop;
    setPreviousScrollTop(scrollbarEl.scrollTop);

    if (withStickyBottom) {
      const scrollBottom = scrollbarEl.clientHeight
        - Math.ceil(scrollbarEl.scrollHeight - scrollbarEl.scrollTop);
      if (Math.abs(scrollBottom) < 20 && !isUpScroll) {
        setSticky(true);
      } else if (isUpScroll) {
        setSticky(false);
      }
    }

    if (disabled) {
      scrollbarEl.scrollTo(0, 0);
    }
  }, [scrollbarRef, disabled, previousScrollTop, withStickyBottom]);

  const setScroll = useCallback<SetScrollFunction>((options) => {
    const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;

    if (scrollbarEl === null) {
      return;
    }
    if ((lockedMode || typeof options !== 'undefined') && scrollbarEl !== null) {
      const { side } = options ?? scrollLocked ?? { side: 'bottom' };

      switch (side) {
        case 'bottom':
          scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
          break;
      }
    }
  }, [lockedMode, scrollLocked]);

  useImperativeHandle(ref, () => ({
    element: scrollbarRef.current,
    setScroll
  }), [scrollbarRef.current, setScroll]);
  
  useEffect(() => {
    setScroll();
  }, [children, setScroll]);

  useEffect(() => {
    const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;
    if (scrollbarEl === null) {
      return;
    }

    handleScroll();
    const slowScrollTimeout: number = 300;
    let slowScrollListener = window.setTimeout(() => {
      handleScroll();
    }, slowScrollTimeout);

    let observer: MutationObserver | null = null;

    if (sticky) {
      observer = new MutationObserver(() => {
        handleScroll();

        if (sticky && !lockedMode) {
          scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
        }
      });

      observer.observe(scrollbarEl, {
        childList: true,
        subtree: true
      });
    }

    const resizeListener = () => {
      window.clearTimeout(slowScrollListener);
      
      handleScroll();

      // height of the scrollbar is updating very slow, so we need to wait for it and check again
      slowScrollListener = window.setTimeout(() => {
        handleScroll();
      }, slowScrollTimeout);
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      clearTimeout(slowScrollListener);
      observer?.disconnect();
      window.removeEventListener('resize', resizeListener);
    };
  }, [scrollbarRef.current, handleScroll, sticky]);

  const contentNode: React.ReactNode = (
    <ScrollbarContent
      $variant={variant}
      $size={size}
      $disabled={disabled}
      $overflow={overflow}
      ref={scrollbarRef}
      className={className}
      onScroll={handleScroll}
    >
      {children}
    </ScrollbarContent>
  );

  if (!advancedMode) {
    return contentNode;
  }
  return (
    <ScrollbarProvider
      scrollbarSize={size}
      scrollShadows={scrollShadows}
      setScroll={setScroll}
      disabled={disabled}
    >
      <ScrollbarStyled
        $overflow={overflow}
        className={scrollbarClassName}
      >
        {contentNode}
        {!disableShadows && (
          <ScrollbarShadows>
            <AnimatePresence>
              {isLeft && scrollShadows.left}
            </AnimatePresence>
            <AnimatePresence>
              {isRight && scrollShadows.right}
            </AnimatePresence>
            <AnimatePresence>
              {isTop && scrollShadows.top}
            </AnimatePresence>
            <AnimatePresence>
              {isBottom && scrollShadows.bottom}
            </AnimatePresence>
          </ScrollbarShadows>
        )}
      </ScrollbarStyled>
    </ScrollbarProvider>
  );
});

export * from './types';
export * from './context';
export * from './styled';
export * from './shadow';
export * from './style';
