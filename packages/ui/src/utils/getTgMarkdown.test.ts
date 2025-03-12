import { expect, test, describe } from 'vitest';
import { getTgMarkdown } from './getTgMarkdown';

describe('getTgMarkdown', () => {
  test('converts basic formatting', () => {
    expect(getTgMarkdown('**Bold**')).toBe('**Bold**');
    expect(getTgMarkdown('*Italic*')).toBe('__Italic__');
    expect(getTgMarkdown('_Italic_')).toBe('__Italic__');
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

  test('converts rule', () => {
    expect(getTgMarkdown('---')).toBe('');
  });

  test('converts **_BoldItalic_** -> **BoldItalic**', () => {
    expect(getTgMarkdown('**_BoldItalic_**')).toBe('**BoldItalic**');
  });

  test('converts __Bold__ OR **Bold** -> **Bold**', () => {
    expect(getTgMarkdown('__Bold__')).toBe('**Bold**');
    expect(getTgMarkdown('**Bold**')).toBe('**Bold**');
  });

  test('converts unordered lists', () => {
    const input = `- Item 1\n- Item 2`;
    const expected = `- Item 1\n- Item 2`;
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('converts ordered lists', () => {
    const inputOrdered = `1. First\n2. Second`;
    const expectedOrdered = `- First\n- Second`;
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
    const expected = `- First\n  - Bullet\n- Second\n  - Nested`;
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

  test('converts basic table to text', () => {
    const input = '| A | B |\n| - | - |\n| 1 | 2 |';
    const expected = 'A B\n1 2';
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('converts table with formatting', () => {
    const input =
      '| **Bold** | *Italic* |\n| -------- | -------- |\n| `Code` | [Link](https://example.com) |';
    const expected = '**Bold** __Italic__\n`Code` https://example.com';
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('handles table with empty cells', () => {
    const input = '| A | B |\n| - | - |\n| 1 |   |\n|   | 2 |';
    const expected = 'A B\n1 \n 2';
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('converts table within content', () => {
    const input =
      'Text before\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\nText after';
    const expected = 'Text before\n\nA B\n1 2\n\nText after';
    expect(getTgMarkdown(input).trim()).toBe(expected);
  });

  test('converts multiline quotes', () => {
    expect(
      getTgMarkdown(
        '> "Markdown is what plain text wants to be."\n> — *Anonymous*'
      )
    ).toBe('__"Markdown is what plain text wants to be."__\n__— Anonymous__');
  });

  test('converts nested bolds', () => {
    expect(
      getTgMarkdown(
        '> 💡 **Pro tip:** Markdown is supported across many platforms including GitHub, Stack Overflow, and Discord.'
      )
    ).toBe(
      '__💡 Pro tip: Markdown is supported across many platforms including GitHub, Stack Overflow, and Discord.__'
    );
  });
});
