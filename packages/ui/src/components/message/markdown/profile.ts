import { normalizeMessageMarkdown } from './utils';

export type MarkdownProfileResult = {
  normalizeMs: number;
  length: number;
};

export function profileNormalizeMessageMarkdown(
  content: string,
): MarkdownProfileResult {
  const start = performance.now();
  const normalized = normalizeMessageMarkdown(content);
  const end = performance.now();

  return {
    normalizeMs: end - start,
    length: normalized.length,
  };
}
