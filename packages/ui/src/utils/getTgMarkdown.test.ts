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
    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('converts ordered lists', () => {
    const inputOrdered = `1. First\n2. Second`;
    const expectedOrdered = `- First\n- Second`;
    expect(getTgMarkdown(inputOrdered)).toBe(expectedOrdered);
  });

  test('converts nested lists', () => {
    const input = `- Item 1\n  - Nested 1\n- Item 2`;
    const expected = `- Item 1\n  - Nested 1\n- Item 2`;
    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('converts deeply nested lists', () => {
    const input = `- Level 1\n  - Level 2\n    - Level 3`;
    const expected = `- Level 1\n  - Level 2\n    - Level 3`;
    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('converts mixed nested lists', () => {
    const input = `1. First\n   - Bullet\n2. Second\n   1. Nested`;
    const expected = `- First\n  - Bullet\n- Second\n  - Nested`;
    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('handles empty input', () => {
    expect(getTgMarkdown('')).toBe('');
  });

  test('handles mixed content', () => {
    const input = `# Heading\n\nParagraph\n\n- List\n- Item\n\n## Subheading\n\n### Subsubheading\n\nCode block\n\`\`\`javascript\nconsole.log('Hello, world!');\n\`\`\`\n\n> Blockquote\n\n[Link](https://example.com)\n\n![Image](https://example.com/image.jpg)`;

    const expected = `**Heading**\n\nParagraph\n\n- List\n- Item\n\n**Subheading**\n\n**Subsubheading**\n\nCode block\n\n\`\`\`javascript\nconsole.log('Hello, world!');\n\`\`\`\n\n__Blockquote__\n\nhttps://example.com\n\nhttps://example.com/image.jpg`;
    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('converts basic table to text', () => {
    const input = '| A | B |\n| - | - |\n| 1 | 2 |';
    const expected = 'A B\n1 2';
    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('converts table with formatting', () => {
    const input =
      '| **Bold** | *Italic* |\n| -------- | -------- |\n| `Code` | [Link](https://example.com) |';
    const expected = '**Bold** __Italic__\n`Code` https://example.com';
    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('handles table with empty cells', () => {
    const input = '| A | B |\n| - | - |\n| 1 |   |\n|   | 2 |';
    const expected = 'A B\n1 \n 2';
    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('converts table within content', () => {
    const input =
      'Text before\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\nText after';
    const expected = 'Text before\n\nA B\n1 2\n\nText after';
    expect(getTgMarkdown(input)).toBe(expected);
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

  test('converts mixed content', () => {
    const input =
      '*Отчет за 18 января 2029 года:*\n\n:busts_in_silhouette: Участники:\n• :princess: Участник 1\n• :princess: Участник 2\n• :prince: Участник 3\n• :prince: Участник 4\n\nСтатус проектов:\n:princess: *Участник 1*\n  :calendar: Заказчик 1\n    - Провели долгий созвон с Участник X, искали и нашли истину по одной из задач\n    - Использовали ИИ для анализа предыдущего созвона, что помогло в решении проблемы\n    ○ Задачи\n      - Создать отдельный канал в Slack для хранения записей созвонов\n\n  :calendar: История Плутона / Телевидение Плутона\n    - Участник N позвонил, необходимо ответить в течение недели о планах\n    ○ Проблемы\n      - Нет свободных разработчиков (Учатник Z уходит в отпуск на следующую неделю)\n    ○ Задачи\n      - Сделать календарь мероприятий для "Истории Плутона"\n      - Реализовать регистрацию и модерацию пользователей для "Телевидения Плутон"\n      - Исследовать возможность ограничения встраивания видео с ВК на другие сайты\n\n';

    const expected =
      '__Отчет за 18 января 2029 года:__\n\n:busts_in_silhouette: Участники:\n• :princess: Участник 1\n• :princess: Участник 2\n• :prince: Участник 3\n• :prince: Участник 4\n\nСтатус проектов:\n:princess: __Участник 1__\n:calendar: Заказчик 1\n- Провели долгий созвон с Участник X, искали и нашли истину по одной из задач\n- Использовали ИИ для анализа предыдущего созвона, что помогло в решении проблемы\n○ Задачи\n- Создать отдельный канал в Slack для хранения записей созвонов\n\n:calendar: История Плутона / Телевидение Плутона\n- Участник N позвонил, необходимо ответить в течение недели о планах\n○ Проблемы\n- Нет свободных разработчиков (Учатник Z уходит в отпуск на следующую неделю)\n○ Задачи\n- Сделать календарь мероприятий для "Истории Плутона"\n- Реализовать регистрацию и модерацию пользователей для "Телевидения Плутон"\n- Исследовать возможность ограничения встраивания видео с ВК на другие сайты';

    expect(getTgMarkdown(input)).toBe(expected);
  });

  test('doesnt add unneccesary escaping', () => {
    expect(getTgMarkdown(':busts_in_silhouette: Участники:')).toBe(
      ':busts_in_silhouette: Участники:'
    );
    expect(getTgMarkdown('[/* your extensions */]')).toBe(
      '[/* your extensions */]'
    );
  });

  test('strips leading spaces', () => {
    expect(getTgMarkdown('  :calendar: Заказчик 1')).toBe(
      ':calendar: Заказчик 1'
    );
  });

  test('preserves inline code', () => {
    expect(
      getTgMarkdown('`containerElement` would be the `span.string` element')
    ).toBe('`containerElement` would be the `span.string` element');
  });

  test('preserves checkboxes', () => {
    expect(
      getTgMarkdown('- [ ] Checkbox 1\n- [ ] Checkbox 2\n- [x] Checkbox 3')
    ).toBe('- [ ] Checkbox 1\n- [ ] Checkbox 2\n- [x] Checkbox 3');
  });

  test('bold formatting in headings', () => {
    expect(getTgMarkdown('## **Heading**')).toBe('**Heading**');
  });

  test('bold italic formatting in headings', () => {
    expect(getTgMarkdown('#### ***Проблемы***')).toBe('**Проблемы**');
  });

  test('italic formatting in headings', () => {
    expect(getTgMarkdown('## __Heading__')).toBe('**Heading**');
    expect(getTgMarkdown('#### *Проблемы*')).toBe('**Проблемы**');
  });

  test('inline code formatting in headings', () => {
    expect(getTgMarkdown('#### `Проблемы`')).toBe('**Проблемы**');
  });

  test('bold text in list', () => {
    expect(
      getTgMarkdown('- **Обработка запросов** пользователей по всему миру 🌍')
    ).toBe('- **Обработка запросов** пользователей по всему миру 🌍');
  });
});
