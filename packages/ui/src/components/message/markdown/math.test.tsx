import React from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup } from '@testing-library/react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import katex from 'katex';
import type { PluggableList } from 'unified';
import { customRender } from '@/ui/tests';
import { useTheme } from '@/ui/theme';
import { rehypeMath } from './math-plugins';
import { MATH_TAG_NAME, MarkdownMath, renderMath } from './math';

const remarkPlugins: PluggableList = [
  remarkGfm,
  [remarkMath, { singleDollarTextMath: true }],
];

const mathComponents = { [MATH_TAG_NAME]: MarkdownMath } as Components;

// The pipeline used before formulas were cached.
const RehypeKatexMarkdown = ({ children }: { children: string }) => {
  const errorColor = useTheme().colors.orange;
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={[
        [rehypeKatex, { output: 'html', errorColor, strict: false }],
      ]}
    >
      {children}
    </ReactMarkdown>
  );
};

const MathMarkdown = ({ children }: { children: string }) => (
  <ReactMarkdown
    remarkPlugins={remarkPlugins}
    rehypePlugins={[rehypeMath]}
    components={mathComponents}
  >
    {children}
  </ReactMarkdown>
);

// React writes `style` objects, KaTeX HTML keeps the attribute as is: compare
// parsed declarations instead of the raw attribute.
const serialize = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) {
    return JSON.stringify(node.textContent);
  }

  if (!(node instanceof Element)) {
    return '';
  }

  const attributes = Array.from(node.attributes)
    .map(({ name, value }) => {
      if (name !== 'style') {
        return `${name}=${JSON.stringify(value)}`;
      }
      const { style } = node as HTMLElement | SVGElement;
      const declarations = Array.from({ length: style.length }, (_, i) => {
        const property = style.item(i);
        return `${property}:${style.getPropertyValue(property)}`;
      });
      return `style=${JSON.stringify(declarations.sort().join(';'))}`;
    })
    .sort()
    .join(' ');

  const children = Array.from(node.childNodes).map(serialize).join('');

  return `<${node.tagName.toLowerCase()} ${attributes}>${children}</>`;
};

const renderBoth = (markdown: string) => {
  const expected = customRender(
    <RehypeKatexMarkdown>{markdown}</RehypeKatexMarkdown>,
  ).container;
  const actual = customRender(
    <MathMarkdown>{markdown}</MathMarkdown>,
  ).container;

  return { expected: serialize(expected), actual: serialize(actual) };
};

const corpus = [
  'Inline $x^2 + y_i$ and $\\alpha + \\beta = \\gamma$ in text.',
  '$$\n\\int_0^1 f(x)\\,dx = \\frac{\\pi^2}{6}\n$$',
  'Text\n\n$$\nE = mc^2\n$$\n\nMore text',
  '```math\na^2 + b^2 = c^2\n```',
  'Roots $\\sqrt{x}$, $\\sqrt[3]{y}$ and vectors $\\overrightarrow{AB}$.',
  '$\\displaystyle \\sum_{n=1}^{\\infty} \\frac{1}{n^2}$',
  '$$\n\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\n$$',
  'Comparison $a < b > c$ and $a \\& b$ and $\\text{"quoted" \'text\'}$',
  '- item $x$\n- item\n\n  $$\n  y = 2\n  $$',
  '> quote $z^2$\n>\n> $$\n> w\n> $$',
  '| a | b |\n|---|---|\n| $x_1$ | $\\frac{1}{2}$ |',
  'Colors $\\color{red} x$ and $\\textcolor{blue}{y}$',
  'Broken $\\frac{a}{$ formula',
  '$$\n\\frac{a}{b} + \\left(\n$$',
  'Unknown $\\unknowncommand{x}$ macro',
  '$$\n\\begin{aligned} a &= b \\\\ c &= d \\end{aligned}\n$$',
];

describe('MarkdownMath', () => {
  afterEach(() => {
    cleanup();
  });

  test.each(corpus)('renders the same markup as rehype-katex: %j', (md) => {
    const { expected, actual } = renderBoth(md);

    expect(actual).toBe(expected);
  });

  test('shows errors in the theme error color', () => {
    const { container } = customRender(
      <MathMarkdown>{'Broken $\\frac{a}{$'}</MathMarkdown>,
    );

    const error = container.querySelector<HTMLElement>('.katex-error');
    expect(error).not.toBeNull();
    expect(error?.getAttribute('title')).toContain('ParseError');
    expect(error?.style.color).not.toBe('');
  });

  test('renders each formula once while the text around it changes', () => {
    const spy = vi.spyOn(katex, 'renderToString');
    let setText: (text: string) => void = () => {};

    const Streaming = () => {
      const [text, set] = React.useState('$a_1 + b_1$ and $$c_1$$ text');
      setText = set;
      return <MathMarkdown>{text}</MathMarkdown>;
    };

    const { container } = customRender(<Streaming />);
    const formula = container.querySelector('.katex');
    const calls = spy.mock.calls.length;

    act(() => setText('$a_1 + b_1$ and $$c_1$$ text grows'));
    act(() => setText('$a_1 + b_1$ and $$c_1$$ text grows more'));

    expect(spy.mock.calls.length).toBe(calls);
    expect(container.querySelector('.katex')).toBe(formula);
    spy.mockRestore();
  });

  test('keeps a bounded cache', () => {
    const first = renderMath('q_{0}', false, 'red');

    for (let i = 1; i <= 600; i++) {
      renderMath(`q_{${i}}`, false, 'red');
    }

    expect(renderMath('q_{600}', false, 'red')).toBe(
      renderMath('q_{600}', false, 'red'),
    );
    expect(renderMath('q_{0}', false, 'red')).not.toBe(first);
  });
});
