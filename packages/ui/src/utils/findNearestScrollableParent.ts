export const findNearestScrollableParent = (
  el: HTMLElement | null,
): HTMLElement | null => {
  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    const { overflowY } = style;

    if (overflowY === 'auto' || overflowY === 'scroll') {
      return el;
    }

    el = el.parentElement;
  }

  return null;
};
