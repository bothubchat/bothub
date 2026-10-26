export interface HorizontalEdges {
  left: boolean;
  right: boolean;
}

export type HorizontalScroll = Pick<
  HTMLElement,
  'scrollLeft' | 'scrollWidth' | 'clientWidth'
>;

/**
 * Есть ли что прокрутить влево и вправо. Правила те же, что у теней
 * Scrollbar: теней нет, если они шире самого блока.
 */
export const getHorizontalEdges = (
  { scrollLeft, scrollWidth, clientWidth }: HorizontalScroll,
  shadowSize: number,
): HorizontalEdges => {
  if (shadowSize > clientWidth) {
    return { left: false, right: false };
  }

  return {
    left: scrollLeft !== 0,
    right: Math.round(scrollLeft) + 1 < scrollWidth - clientWidth,
  };
};

export const isSameEdges = (a: HorizontalEdges, b: HorizontalEdges) =>
  a.left === b.left && a.right === b.right;
