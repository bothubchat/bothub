import { describe, expect, test } from 'vitest';
import { profileNormalizeMessageMarkdown } from './profile';

describe('profileNormalizeMessageMarkdown', () => {
  test('profiles normalization for long streaming-like content', () => {
    const chunk = 'Token $12 text with math $x + y$ and line.\n';
    const longMessage = chunk.repeat(4000);

    const result = profileNormalizeMessageMarkdown(longMessage);

    expect(result.length).toBeGreaterThan(0);
    expect(Number.isFinite(result.normalizeMs)).toBe(true);
    expect(result.normalizeMs).toBeGreaterThanOrEqual(0);
  });
});
