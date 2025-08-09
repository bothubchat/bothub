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
    const [isLeft, setIsLeft] = useState<boolean>(false);
    const [isRight, setIsRight] = useState<boolean>(false);
    const [isTop, setIsTop] = useState<boolean>(false);
    const [isBottom, setIsBottom] = useState<boolean>(false);
    const advancedMode = !!scrollShadows;
    const lockedMode = !!scrollLocked;
    const [sticky, setSticky] = useState<boolean>(defaultStickyBottom);
    const [previousScrollTop, setPreviousScrollTop] = useState<number>(0);
    const scrollShadowsSize = scrollShadows?.size ?? 60;

    const handleScroll = useCallback(
      (scrollbarEl: HTMLDivElement) => {
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
        const isTop = !isBiggerThanContentHeight && scrollTop !== 0;
        const isBottom =
          !isBiggerThanContentHeight &&
          Math.round(scrollTop) + 1 < scrollHeight - clientHeight;

        setIsTop(isTop);
        setIsBottom(isBottom);
        setIsLeft(!isBiggerThanContentWidth && scrollLeft !== 0);
        setIsRight(
          !isBiggerThanContentWidth &&
            Math.round(scrollLeft) + 1 < scrollWidth - clientWidth,
        );

        const isUpScroll = previousScrollTop > scrollbarEl.scrollTop;
        setPreviousScrollTop(scrollbarEl.scrollTop);

        if (withStickyBottom) {
          const scrollBottom =
            scrollbarEl.clientHeight -
            Math.ceil(scrollbarEl.scrollHeight - scrollbarEl.scrollTop);
          if (Math.abs(scrollBottom) < 20 && !isUpScroll) {
            setSticky(true);
          } else if (isUpScroll) {
            setSticky(false);
          }
        }

        if (disabled) {
          scrollbarEl.scrollTo(0, 0);
        }
        onScroll?.({ isTop, isBottom, previousScrollTop });
      },
      [
        scrollbarRef.current,
        disabled,
        previousScrollTop,
        withStickyBottom,
        scrollShadowsSize,
        onScroll,
      ],
    );

    useEffect(() => {
      if (!isHorizontalScrollbar) {
        return;
      }
      const handleWheel = (e: WheelEvent) => {
        if (scrollbarRef.current) {
          e.preventDefault();
          scrollbarRef.current.scrollLeft += e.deltaY;
        }
      };
      const container = scrollbarRef.current;
      if (container) {
        container.addEventListener('wheel', handleWheel);
      }

      return () => {
        if (container) {
          container.removeEventListener('wheel', handleWheel);
        }
      };
    }, [isHorizontalScrollbar, scrollbarRef.current]);

    const setScroll = useCallback<SetScrollFunction>(
      (options) => {
        const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;

        if (scrollbarEl === null) {
          return;
        }
        if (
          (lockedMode || typeof options !== 'undefined') &&
          scrollbarEl !== null
        ) {
          const { side } = options ?? scrollLocked ?? { side: 'bottom' };

          switch (side) {
            case 'bottom':
              scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
              break;
          }
        }
      },
      [lockedMode, scrollLocked],
    );

    useImperativeHandle(
      ref,
      () => ({
        element: scrollbarRef.current,
        setScroll,
      }),
      [scrollbarRef.current, setScroll],
    );

    useEffect(() => {
      setScroll();
    }, [children, setScroll]);

    useEffect(() => {
      const scrollbarEl: HTMLDivElement | null = scrollbarRef.current;
      if (scrollbarEl === null) {
        return;
      }

      handleScroll(scrollbarEl);
      const slowScrollTimeout: number = 500;
      let slowScrollListener = window.setTimeout(() => {
        handleScroll(scrollbarEl);
      }, slowScrollTimeout);

      let observer: MutationObserver | null = null;

      if (sticky) {
        observer = new MutationObserver(() => {
          handleScroll(scrollbarEl);

          if (sticky && !lockedMode) {
            scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
          }
        });

        observer.observe(scrollbarEl, {
          childList: true,
          subtree: true,
        });
      }

      const resizeListener = () => {
        window.clearTimeout(slowScrollListener);

        handleScroll(scrollbarEl);

        // height of the scrollbar is updating very slow, so we need to wait for it and check again
        slowScrollListener = window.setTimeout(() => {
          handleScroll(scrollbarEl);
        }, slowScrollTimeout);
      };

      window.addEventListener('resize', resizeListener);
      let resizeObserver: ResizeObserver | null = null;
      if (scrollbarRef.current) {
        resizeObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            handleScroll(entry.target as HTMLDivElement);
          });
        });
        resizeObserver.observe(scrollbarRef.current);
      }

      return () => {
        clearTimeout(slowScrollListener);
        observer?.disconnect();
        window.removeEventListener('resize', resizeListener);
        resizeObserver?.disconnect();
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
        onScroll={() => {
          if (scrollbarRef.current) {
            handleScroll(scrollbarRef.current);
          }
        }}
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
        isLeft={isLeft}
        isRight={isRight}
        isTop={isTop}
        isBottom={isBottom}
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
