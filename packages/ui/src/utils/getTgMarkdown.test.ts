import { expect, test, describe } from 'vitest';
import { getTgMarkdown } from './getTgMarkdown';

describe('getTgMarkdown', () => {
  test('converts basic formatting', () => {
    expect(getTgMarkdown('**Bold**')).toBe('**Bold**');
    expect(getTgMarkdown('*Italic*')).toBe('*Italic*');
    expect(getTgMarkdown('***Bold italic***')).toBe('***Bold italic***');
    expect(getTgMarkdown('# Heading')).toBe('**Heading**');
    expect(getTgMarkdown('`code`')).toBe('`code`');
  });

  test('converts links and images', () => {
    expect(getTgMarkdown('[Link](https://example.com)')).toBe(
      'https://example.com'
    );
    expect(getTgMarkdown('![Alt text](https://example.com/image.jpg)')).toBe(
      'https://example.com/image.jpg'
    );
    expect(getTgMarkdown('![](https://example.com/image.jpg)')).toBe(
      'https://example.com/image.jpg'
    );
  });

  test('converts code blocks', () => {
    expect(getTgMarkdown('```\ncode block\n```')).toBe('```\ncode block\n```');
  });

  test('converts blockquotes', () => {
    expect(getTgMarkdown('> Blockquote')).toBe('__Blockquote__');
  });

  test('converts unordered lists', () => {
    const input = `- Item 1\n- Item 2`;
    const expected = `- Item 1\n- Item 2`;
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('converts ordered lists', () => {
    const inputOrdered = `1. First\n2. Second`;
    const expectedOrdered = `1. First\n2. Second`;
    expect(getTgMarkdown(inputOrdered).trim()).toBe(expectedOrdered);
  });

  test('converts nested lists', () => {
    const input = `- Item 1\n  - Nested 1\n- Item 2`;
    const expected = `- Item 1\n  - Nested 1\n- Item 2`;
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('converts deeply nested lists', () => {
    const input = `- Level 1\n  - Level 2\n    - Level 3`;
    const expected = `- Level 1\n  - Level 2\n    - Level 3`;
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('converts mixed nested lists', () => {
    const input = `1. First\n   - Bullet\n2. Second\n   1. Nested`;
    const expected = `1. First\n   - Bullet\n2. Second\n   1. Nested`;
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('handles empty input', () => {
    expect(getTgMarkdown('')).toBe('');
  });

  test('handles mixed content', () => {
    const input = `# Heading\n\nParagraph\n\n- List\n- Item\n\n## Subheading\n\n### Subsubheading\n\nCode block\n\`\`\`javascript\nconsole.log('Hello, world!');\n\`\`\`\n\n> Blockquote\n\n[Link](https://example.com)\n\n![Image](https://example.com/image.jpg)`;

    const expected = `**Heading**\n\nParagraph\n\n- List\n- Item\n\n**Subheading**\n\n**Subsubheading**\n\nCode block\n\n\`\`\`javascript\nconsole.log('Hello, world!');\n\`\`\`\n\n__Blockquote__\n\nhttps://example.com\n\nhttps://example.com/image.jpg`;
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });
});
