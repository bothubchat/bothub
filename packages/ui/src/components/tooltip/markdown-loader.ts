/*
 * react-markdown with remark (about 110 KB, 33 KB gzip) is needed only by
 * tooltips with `markdown`. It is a separate chunk, loaded when such a tooltip
 * mounts, so pages with plain tooltips never download it.
 */
export type TooltipMarkdownModule = typeof import('./markdown');

let markdownModule: TooltipMarkdownModule | null = null;
let markdownPromise: Promise<TooltipMarkdownModule> | null = null;
const listeners = new Set<() => void>();

export const getLoadedTooltipMarkdown = (): TooltipMarkdownModule | null =>
  markdownModule;

/** Loads the markdown chunk once; a failed load is tried again next time. */
export const loadTooltipMarkdown = (): Promise<TooltipMarkdownModule> => {
  markdownPromise ??= import('./markdown').then(
    (module) => {
      markdownModule = module;
      listeners.forEach((listener) => listener());
      return module;
    },
    (error: unknown) => {
      markdownPromise = null;
      throw error;
    },
  );

  return markdownPromise;
};

export const subscribeToTooltipMarkdown = (
  listener: () => void,
): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
