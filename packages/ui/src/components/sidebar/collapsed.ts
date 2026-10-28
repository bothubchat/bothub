/**
 * The collapsed sidebar marks its box with this attribute. Its rows take the
 * collapsed look from CSS, so collapsing doesn't re-render or remount them.
 */
export const SIDEBAR_COLLAPSED_ATTRIBUTE = 'data-sidebar-collapsed';

/** For styles: `${inCollapsedSidebar} & { ... }` */
export const inCollapsedSidebar = `[${SIDEBAR_COLLAPSED_ATTRIBUTE}]`;

export const isInCollapsedSidebar = (element: Element): boolean =>
  element.closest(inCollapsedSidebar) !== null;
