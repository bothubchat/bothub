import { describe, expect, test } from 'vitest';
import { formatDocumentLines } from './document-lines';

describe('formatDocumentLines', () => {
  test('makes a numbered title with clauses a section heading', () => {
    expect(
      formatDocumentLines(
        '1. INTRODUCTION\n1.1. First.\n1.2. Second:\n- Custody.\n1.3. Third.\n\n2. SCOPE\n\n2.1. Text.',
      ),
    ).toBe(
      '### 1. INTRODUCTION\n1.1. First.\n1.2. Second:\n- Custody.\n\n1.3. Third.\n\n### 2. SCOPE\n\n2.1. Text.',
    );
  });

  test('keeps a numbered list without clauses a list', () => {
    expect(formatDocumentLines('1. Install\n2. Run')).toBe(
      '1. Install\n2. Run',
    );
    // Clauses of another section do not make the title a heading.
    expect(formatDocumentLines('1. Title\n2.1. Other')).toBe(
      '1. Title\n\n2.1. Other',
    );
  });

  test('starts a sub-clause after a list with a paragraph of its own', () => {
    expect(formatDocumentLines('  - Custody.\n1.2.1 Clause')).toBe(
      '  - Custody.\n\n1.2.1 Clause',
    );
  });

  test('keeps the bullets under a clause a list', () => {
    expect(
      formatDocumentLines(
        '1.2. Aligned with:\n     - Law;\n       - Article 5;\n     - FATF.\n1.3. Next.',
      ),
    ).toBe('1.2. Aligned with:\n- Law;\n  - Article 5;\n- FATF.\n\n1.3. Next.');
  });

  test('keeps the indent of lines after the clause has ended', () => {
    const text = '1.1. Clause.\n\n    indented code\n2. Title\n   - item';
    expect(formatDocumentLines(text)).toBe(text);
  });

  test('joins a sentence the model wrapped with an indent', () => {
    expect(
      formatDocumentLines(
        '1.1. The policy of\n     the Company.\n- Item that goes\n  on here',
      ),
    ).toBe('1.1. The policy of the Company.\n- Item that goes on here');
    expect(formatDocumentLines('Правила для\n   клиентов')).toBe(
      'Правила для клиентов',
    );
  });

  test('keeps indented lines that are not a wrapped sentence', () => {
    const text = [
      'Aligned with:',
      '     - Law No. 7786;',
      '   Capitalized line',
      '## Heading',
      '   lowercase after a heading',
      '| a |',
      '  lowercase after a table',
      '',
      '    indented code',
    ].join('\n');

    expect(formatDocumentLines(text)).toBe(text);
  });
});
