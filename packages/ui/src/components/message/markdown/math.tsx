import React, { memo } from 'react';
import katex, { type KatexOptions } from 'katex';
import { useTheme } from '@/ui/theme';

/**
 * Element emitted by `rehypeMath` in place of every formula. It is rendered by
 * `MarkdownMath`, so KaTeX runs once per formula instead of once per formula
 * on every streamed chunk.
 */
export const MATH_TAG_NAME = 'katex-math';

export interface MarkdownMathProps {
  'data-tex'?: string;
  'data-display'?: boolean;
}

interface RenderedMath {
  attributes: React.HTMLAttributes<HTMLSpanElement>;
  html: string;
}

const CACHE_LIMIT = 500;
const cache = new Map<string, RenderedMath>();

const ESCAPED_CHARS: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
};

// KaTeX always returns a single root `<span>` with escaped attribute values.
const ROOT_ELEMENT_PATTERN = /^<span((?:\s[\w-]+="[^"]*")*)>([\s\S]*)<\/span>$/;
const ATTRIBUTE_PATTERN = /\s([\w-]+)="([^"]*)"/g;

const unescapeAttribute = (value: string): string =>
  value.replace(
    /&(?:amp|lt|gt|quot|#x27);/g,
    (entity) => ESCAPED_CHARS[entity],
  );

const parseStyle = (value: string): React.CSSProperties => {
  const style: Record<string, string> = {};

  value.split(';').forEach((declaration) => {
    const colon = declaration.indexOf(':');
    if (colon === -1) {
      return;
    }

    const name = declaration
      .slice(0, colon)
      .trim()
      .replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
    style[name] = declaration.slice(colon + 1).trim();
  });

  return style;
};

/**
 * The root element is rendered by React and only its content is set as HTML:
 * a wrapper element would change the markup (`.katex-display` margins, `:first-child`
 * selectors of the message).
 */
const parseKatexHtml = (html: string): RenderedMath => {
  const match = ROOT_ELEMENT_PATTERN.exec(html);

  if (!match) {
    return { attributes: {}, html };
  }

  const attributes: Record<string, unknown> = {};

  for (const [, name, rawValue] of match[1].matchAll(ATTRIBUTE_PATTERN)) {
    const value = unescapeAttribute(rawValue);

    if (name === 'class') {
      attributes.className = value;
    } else if (name === 'style') {
      attributes.style = parseStyle(value);
    } else {
      attributes[name] = value;
    }
  }

  return { attributes, html: match[2] };
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Same fallbacks as rehype-katex: a parse error is rendered by KaTeX itself in
// `errorColor`, any other error gets similar markup.
const renderKatex = (
  tex: string,
  displayMode: boolean,
  errorColor: string,
): RenderedMath => {
  const settings: KatexOptions = {
    output: 'html',
    errorColor,
    strict: false,
    displayMode,
  };

  try {
    return parseKatexHtml(
      katex.renderToString(tex, { ...settings, throwOnError: true }),
    );
  } catch (error) {
    try {
      return parseKatexHtml(
        katex.renderToString(tex, {
          ...settings,
          strict: 'ignore',
          throwOnError: false,
        }),
      );
    } catch {
      return {
        attributes: {
          className: 'katex-error',
          style: { color: errorColor || '#cc0000' },
          title: String(error),
        },
        html: escapeHtml(tex),
      };
    }
  }
};

export const renderMath = (
  tex: string,
  displayMode: boolean,
  errorColor: string,
): RenderedMath => {
  const key = `${displayMode ? 'display' : 'inline'}:${errorColor}:${tex}`;
  const cached = cache.get(key);

  if (cached) {
    // Re-insert to keep the most recently used formulas in the cache.
    cache.delete(key);
    cache.set(key, cached);
    return cached;
  }

  const rendered = renderKatex(tex, displayMode, errorColor);

  cache.set(key, rendered);
  if (cache.size > CACHE_LIMIT) {
    cache.delete(cache.keys().next().value as string);
  }

  return rendered;
};

const MarkdownMathComponent: React.FC<MarkdownMathProps> = ({
  'data-tex': tex = '',
  'data-display': displayMode = false,
}) => {
  const errorColor = useTheme().colors.orange;
  const { attributes, html } = renderMath(tex, displayMode, errorColor);

  return (
    <span
      {...attributes}
      // KaTeX escapes the formula source, same markup rehype-katex produced.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// react-markdown passes a new `node` prop on every render, so only the
// formula itself is compared.
export const MarkdownMath = memo(
  MarkdownMathComponent,
  (prevProps, nextProps) =>
    prevProps['data-tex'] === nextProps['data-tex'] &&
    prevProps['data-display'] === nextProps['data-display'],
);
