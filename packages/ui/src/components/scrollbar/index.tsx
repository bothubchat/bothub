import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { ScrollbarContent, ScrollbarShadows, ScrollbarStyled } from './styled';
import {
  SetScrollFunction,
  SetScrollOptions,
  ScrollbarOverflow,
  ScrollbarRef,
  ScrollbarShadowsProps,
  ScrollbarVariant,
} from './types';
import { ScrollbarProvider } from './context';
import { useEventCallback } from '@/ui/utils/useEventCallback';

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
  isHorizontalScrollbar?: boolean;
  onScroll?: ScrollbarScrollEventHandler;
}

export type ScrollbarScrollEventHandler = (event: {
  isTop: boolean;
  isBottom: boolean;
  previousScrollTop: number;
}) => unknown;

interface ScrollbarEdges {
  isLeft: boolean;
  isRight: boolean;
  isTop: boolean;
  isBottom: boolean;
}

const initialEdges: ScrollbarEdges = {
  isLeft: false,
  isRight: false,
  isTop: false,
  isBottom: false,
};

const getScrollbarEdges = (
  scrollbarEl: HTMLDivElement,
  scrollShadowsSize: number,
): ScrollbarEdges => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    scrollLeft,
    scrollWidth,
    clientWidth,
  } = scrollbarEl;

  const isBiggerThanContentHeight = scrollShadowsSize > clientHeight;
  const isBiggerThanContentWidth = scrollShadowsSize > clientWidth;

  return {
    isTop: !isBiggerThanContentHeight && scrollTop !== 0,
    isBottom:
      !isBiggerThanContentHeight &&
      Math.round(scrollTop) + 1 < scrollHeight - clientHeight,
    isLeft: !isBiggerThanContentWidth && scrollLeft !== 0,
    isRight:
      !isBiggerThanContentWidth &&
      Math.round(scrollLeft) + 1 < scrollWidth - clientWidth,
  };
};

const areEdgesEqual = (a: ScrollbarEdges, b: ScrollbarEdges): boolean =>
  a.isLeft === b.isLeft &&
  a.isRight === b.isRight &&
  a.isTop === b.isTop &&
  a.isBottom === b.isBottom;

// Height of the content may settle slowly after mount (fonts, images), so
// check once more after this delay.
const slowLayoutTimeout = 500;

export const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>(
  (
    {
      className,
      scrollbarClassName,
      variant = 'primary',
      size = 6,
      scrollShadows,
      scrollLocked,
      overflow = 'auto',
      disabled = false,
      disableShadows = false,
      children,
      onScroll,
      defaultStickyBottom = false,
      withStickyBottom = false,
      isHorizontalScrollbar = false,
    },
    ref,
  ) => {
    const scrollbarRef = useRef<HTMLDivElement>(null);
    // Edges are rendered only by the shadows, so they are state only in
    // advanced mode; the rest of the scroll bookkeeping lives in refs.
    const [edges, setEdges] = useState<ScrollbarEdges>(initialEdges);
    const edgesRef = useRef<ScrollbarEdges>(initialEdges);
    const stickyRef = useRef<boolean>(defaultStickyBottom);
    const previousScrollTopRef = useRef<number>(0);
    const advancedMode = !!scrollShadows;
    const lockedMode = !!scrollLocked;
    const stickyBottomEnabled = withStickyBottom || defaultStickyBottom;
    const scrollShadowsSize = scrollShadows?.size ?? 60;

    const applyEdges = useEventCallback((nextEdges: ScrollbarEdges) => {
      if (advancedMode && !areEdgesEqual(edgesRef.current, nextEdges)) {
        edgesRef.current = nextEdges;
        setEdges(nextEdges);
      }
    });

    const refreshEdges = useEventCallback((scrollbarEl: HTMLDivElement) => {
      applyEdges(getScrollbarEdges(scrollbarEl, scrollShadowsSize));
    });

    const handleScroll = useEventCallback((scrollbarEl: HTMLDivElement) => {
      const nextEdges = getScrollbarEdges(scrollbarEl, scrollShadowsSize);
      const { isTop, isBottom } = nextEdges;
      applyEdges(nextEdges);

      const previousScrollTop = previousScrollTopRef.current;
      const isUpScroll = previousScrollTop > scrollbarEl.scrollTop;
      previousScrollTopRef.current = scrollbarEl.scrollTop;

      if (withStickyBottom) {
        const scrollBottom =
          scrollbarEl.clientHeight -
          Math.ceil(scrollbarEl.scrollHeight - scrollbarEl.scrollTop);
        if (Math.abs(scrollBottom) < 20 && !isUpScroll) {
          stickyRef.current = true;
        } else if (isUpScroll) {
          stickyRef.current = false;
        }
      }

      if (disabled) {
        scrollbarEl.scrollTo(0, 0);
      }
      onScroll?.({ isTop, isBottom, previousScrollTop });
    });

    const handleContentMutation = useEventCallback(
      (scrollbarEl: HTMLDivElement) => {
        if (!stickyRef.current) {
          return;
        }

        handleScroll(scrollbarEl);

        if (!lockedMode) {
          scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
        }
      },
    );

    const handleContentScroll = useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        handleScroll(event.currentTarget);
      },
      [handleScroll],
    );

    useEffect(() => {
      const container = scrollbarRef.current;
      if (!isHorizontalScrollbar || container === null) {
        return;
      }

      // Turns vertical wheel into horizontal scroll. Not passive, otherwise
      // preventDefault is ignored and the page scrolls as well; the page
      // still scrolls when there is nothing to scroll horizontally.
      const handleWheel = (event: WheelEvent) => {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (
          event.deltaY === 0 ||
          maxScrollLeft <= 0 ||
          (event.deltaY < 0 && container.scrollLeft <= 0) ||
          (event.deltaY > 0 && container.scrollLeft >= maxScrollLeft - 1)
        ) {
          return;
        }

        event.preventDefault();
        container.scrollLeft += event.deltaY;
      };
      container.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }, [isHorizontalScrollbar, advancedMode]);

    const setScroll: SetScrollFunction = useEventCallback(
      (options?: SetScrollOptions) => {
        const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;

        if (scrollbarEl === null) {
          return;
        }
        if (lockedMode || typeof options !== 'undefined') {
          const { side } = options ?? scrollLocked ?? { side: 'bottom' };

          switch (side) {
            case 'bottom':
              scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
              break;
          }
        }
      },
    );

    useImperativeHandle(
      ref,
      () => ({
        get element() {
          return scrollbarRef.current;
        },
        setScroll,
      }),
      [setScroll],
    );

    // Subscribes once per element (the content element is recreated when
    // `scrollShadows` toggles), not on every scroll.
    useEffect(() => {
      const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;
      if (scrollbarEl === null) {
        return;
      }

      handleScroll(scrollbarEl);
      const slowLayoutTimer = window.setTimeout(() => {
        handleScroll(scrollbarEl);
      }, slowLayoutTimeout);

      // Also covers window resizes that change the element size.
      const resizeObserver = new ResizeObserver(() => {
        handleScroll(scrollbarEl);
      });
      resizeObserver.observe(scrollbarEl);

      let mutationObserver: MutationObserver | null = null;
      if (stickyBottomEnabled) {
        mutationObserver = new MutationObserver(() => {
          handleContentMutation(scrollbarEl);
        });
        mutationObserver.observe(scrollbarEl, {
          childList: true,
          subtree: true,
        });
      }

      return () => {
        window.clearTimeout(slowLayoutTimer);
        resizeObserver.disconnect();
        mutationObserver?.disconnect();
      };
    }, [
      advancedMode,
      stickyBottomEnabled,
      handleScroll,
      handleContentMutation,
    ]);

    // Rerendered content may change the scroll size without resizing the
    // element: refresh the shadows once per frame after such renders.
    const edgesFrameRef = useRef<number | null>(null);
    useEffect(() => {
      if (!advancedMode || edgesFrameRef.current !== null) {
        return;
      }

      edgesFrameRef.current = window.requestAnimationFrame(() => {
        edgesFrameRef.current = null;
        if (scrollbarRef.current !== null) {
          refreshEdges(scrollbarRef.current);
        }
      });
    });
    useEffect(
      () => () => {
        if (edgesFrameRef.current !== null) {
          window.cancelAnimationFrame(edgesFrameRef.current);
          edgesFrameRef.current = null;
        }
      },
      [],
    );

    const contentNode: React.ReactNode = (
      <ScrollbarContent
        $variant={variant}
        $size={size}
        $disabled={disabled}
        $overflow={overflow}
        ref={scrollbarRef}
        className={className}
        onScroll={handleContentScroll}
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
        isLeft={edges.isLeft}
        isRight={edges.isRight}
        isTop={edges.isTop}
        isBottom={edges.isBottom}
      >
        <ScrollbarStyled
          $overflow={overflow}
          className={scrollbarClassName}
        >
          {contentNode}
          {!disableShadows && (
            <ScrollbarShadows>
              {scrollShadows.left}
              {scrollShadows.right}
              {scrollShadows.top}
              {scrollShadows.bottom}
            </ScrollbarShadows>
          )}
        </ScrollbarStyled>
      </ScrollbarProvider>
    );
  },
);

export * from './types';
export * from './context';
export * from './styled';
export * from './shadow';
export * from './style';
