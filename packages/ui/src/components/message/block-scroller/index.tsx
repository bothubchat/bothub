import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ScrollbarContent,
  ScrollbarProvider,
  ScrollbarShadow,
  ScrollbarShadows,
  ScrollbarStyled,
} from '@/ui/components/scrollbar';
import { getHorizontalEdges, HorizontalEdges, isSameEdges } from './utils';

const SHADOW_SIZE = 60;
const SCROLLBAR_SIZE = 6;

export interface MessageBlockScrollerProps extends React.PropsWithChildren {
  color: string;
}

/**
 * Горизонтальная прокрутка пузыря для широких таблиц и формул. DOM как у
 * Scrollbar, но тени монтируются, только когда содержимое не помещается:
 * у обычного пузыря нет ни таймера, ни слушателя window, ни анимаций теней.
 */
export const MessageBlockScroller: React.FC<MessageBlockScrollerProps> = ({
  color,
  children,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<HorizontalEdges>({
    left: false,
    right: false,
  });

  const updateEdges = useCallback(() => {
    const scrollerEl = scrollerRef.current;
    if (scrollerEl === null) {
      return;
    }

    const nextEdges = getHorizontalEdges(scrollerEl, SHADOW_SIZE);
    setEdges((prevEdges) =>
      isSameEdges(prevEdges, nextEdges) ? prevEdges : nextEdges,
    );
  }, []);

  useEffect(() => {
    const scrollerEl = scrollerRef.current;
    if (scrollerEl === null) {
      return;
    }

    // Первый вызов — сразу после observe, дальше — при стриме, ресайзе
    // и повороте экрана
    const resizeObserver = new ResizeObserver(updateEdges);
    resizeObserver.observe(scrollerEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateEdges]);

  return (
    <ScrollbarStyled $overflow="auto">
      <ScrollbarContent
        ref={scrollerRef}
        $variant="secondary"
        $size={SCROLLBAR_SIZE}
        $disabled={false}
        $overflow="auto"
        onScroll={updateEdges}
      >
        {children}
      </ScrollbarContent>
      {(edges.left || edges.right) && (
        <ScrollbarProvider
          scrollbarSize={SCROLLBAR_SIZE}
          scrollShadows={{ color, size: SHADOW_SIZE }}
          setScroll={() => {}}
          disabled={false}
          isLeft={edges.left}
          isRight={edges.right}
          isTop={false}
          isBottom={false}
        >
          <ScrollbarShadows>
            <ScrollbarShadow side="left" />
            <ScrollbarShadow side="right" />
          </ScrollbarShadows>
        </ScrollbarProvider>
      )}
    </ScrollbarStyled>
  );
};
