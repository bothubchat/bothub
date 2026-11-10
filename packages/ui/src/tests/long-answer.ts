/*
 * A long assistant answer for the streaming benchmark, tests and stories:
 * headings, paragraphs with inline markup, lists, code with and without a
 * language, tables, quotes and, optionally, formulas.
 */

const section = (index: number, withMath: boolean): string =>
  [
    `## Шаг ${index + 1}. Разбираем задачу`,
    '',
    `Сначала посмотрим на **входные данные** и на то, как они меняются со временем. В варианте ${index + 1} важно не потерять *порядок событий*: \`queue.push(event)\` вызывается из нескольких мест, а подробности есть в [документации](https://bothub.chat/docs/${index}).${withMath ? ` Сложность обработки — $O(n \\log n)$, а при $n = ${(index + 1) * 100}$ это заметно.` : ''}`,
    '',
    '1. Собираем события в очередь.',
    '2. Сортируем их по времени и убираем дубли.',
    `3. Обрабатываем пачками по ${(index % 4) + 2} штуки.`,
    '',
    index % 2 === 0 ? '```ts' : '```',
    `export function processBatch${index}(events: Event[]): Result[] {`,
    '  const sorted = [...events].sort((a, b) => a.time - b.time);',
    '  const unique = sorted.filter(',
    '    (event, i) => i === 0 || event.id !== sorted[i - 1].id,',
    '  );',
    '',
    '  return unique.map((event) => ({',
    '    id: event.id,',
    `    weight: event.value * ${index + 1},`,
    '    done: false,',
    '  }));',
    '}',
    '```',
    '',
    ...(withMath
      ? [
          '$$',
          `S_{${index}} = \\sum_{i=1}^{n} \\frac{w_i}{1 + e^{-k(x_i - ${index})}}`,
          '$$',
          '',
        ]
      : []),
    '| Параметр | Значение | Комментарий |',
    '|---|:-:|---|',
    `| batch | ${(index % 4) + 2} | размер пачки |`,
    `| timeout | ${(index + 1) * 50} мс | ожидание новых событий |`,
    '| retries | 3 | повторы при ошибке |',
    '',
    `> Если очередь растёт быстрее, чем обрабатывается, увеличьте размер пачки — но не больше ${(index % 4) + 8}.`,
    '',
    '- Проверьте логи после деплоя.',
    '- Сравните время ответа до и после.',
    '',
  ].join('\n');

/** Builds an answer of at least `size` characters. */
export const createLongAnswer = (size: number, withMath = false): string => {
  let answer = '';

  for (let index = 0; answer.length < size; index++) {
    answer += `${section(index, withMath)}\n`;
  }

  return answer;
};
