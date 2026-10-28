import React, {
  ReactNode,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import hljs from 'highlight.js/lib/core';
import { useIsomorphicLayoutEffect } from '@/ui/utils/useIsomorphicLayoutEffect';
import { useMessageCodeTyping } from './typing';
import { HIGHLIGHT_LANGUAGES } from './languages';

hljs.configure({
  ignoreUnescapedHTML: true,
});

// Регистрация рядом с подсветкой: модуль, который только регистрирует языки,
// сборщик приложения вправе выбросить (sideEffects в package.json)
Object.entries(HIGHLIGHT_LANGUAGES).forEach(([name, language]) => {
  hljs.registerLanguage(name, language);
});

export interface HighlightProps {
  children: ReactNode;
  className?: string;
}

interface HighlightedCode {
  code: string;
  language: string | undefined;
  html: string;
  /** `language-*` class highlight.js adds to a highlighted element. */
  languageClassName: string;
}

const NO_HIGHLIGHT_PATTERN = /^(no-?highlight)$/i;
const LANGUAGE_CLASS_PATTERN = /\blang(?:uage)?-([\w-]+)\b/i;

/** Minimal delay between highlights of a block while the message is typed. */
export const TYPING_HIGHLIGHT_INTERVAL = 250;

const CACHE_LIMIT = 2_000_000;
const cache = new Map<string, HighlightedCode>();
let cacheSize = 0;

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Picks the language from class names the same way `hljs.highlightElement`
// does, so `ts` and `language-ts` keep working.
const getBlockLanguage = (className: string): string | undefined => {
  const match = LANGUAGE_CLASS_PATTERN.exec(className);
  if (match) {
    return hljs.getLanguage(match[1]) ? match[1] : 'no-highlight';
  }

  return className
    .split(/\s+/)
    .find((name) => NO_HIGHLIGHT_PATTERN.test(name) || hljs.getLanguage(name));
};

// highlight.js names the class after the language an alias points to.
const getAliasedLanguage = (alias: string): string | undefined => {
  let aliased: string | undefined;

  hljs.listLanguages().forEach((name) => {
    if (
      hljs
        .getLanguage(name)
        ?.aliases?.some((item) => item.toLowerCase() === alias)
    ) {
      aliased = name;
    }
  });

  return aliased;
};

/**
 * Highlights the code as `hljs.highlightElement` would, without touching the
 * DOM: React keeps control of the class names, so a language guessed for the
 * first chunk does not stick to the block.
 */
const highlightCode = (
  code: string,
  language: string | undefined,
): HighlightedCode => {
  const result = language
    ? hljs.highlight(code, { language, ignoreIllegals: true })
    : hljs.highlightAuto(code);
  const languageName =
    (language && getAliasedLanguage(language)) || result.language;

  return {
    code,
    language,
    html: result.value,
    languageClassName: `language-${languageName}`,
  };
};

const getCacheKey = (code: string, language: string | undefined) =>
  `${language ?? ''}\n${code}`;

const getCached = (
  code: string,
  language: string | undefined,
): HighlightedCode | undefined => {
  const key = getCacheKey(code, language);
  const cached = cache.get(key);

  if (cached) {
    // Re-insert to keep recently shown blocks in the cache.
    cache.delete(key);
    cache.set(key, cached);
  }

  return cached;
};

const setCached = (value: HighlightedCode) => {
  const key = getCacheKey(value.code, value.language);
  const size = value.code.length + value.html.length;

  if (cache.has(key) || size > CACHE_LIMIT / 4) {
    return;
  }

  cache.set(key, value);
  cacheSize += size;

  for (const [oldKey, oldValue] of cache) {
    if (cacheSize <= CACHE_LIMIT) {
      break;
    }
    cache.delete(oldKey);
    cacheSize -= oldValue.code.length + oldValue.html.length;
  }
};

const highlightCached = (
  code: string,
  language: string | undefined,
): HighlightedCode => {
  const cached = getCached(code, language);
  if (cached) {
    return cached;
  }

  const highlighted = highlightCode(code, language);
  setCached(highlighted);
  return highlighted;
};

export const Highlight: React.FC<HighlightProps> = memo(
  ({ children, className = '' }) => {
    const code = String(children ?? '');
    const typing = useMessageCodeTyping();
    const language = useMemo(() => getBlockLanguage(className), [className]);
    const isDisabled = !!language && NO_HIGHLIGHT_PATTERN.test(language);
    // Guessing the language of a block that is still typed is expensive and
    // unstable, so blocks without a language are highlighted once complete.
    const canHighlightWhileTyping = !isDisabled && !!language;

    const lastRunRef = useRef({ time: 0, duration: 0 });
    const [typed, setTyped] = useState<HighlightedCode | null>(() => {
      if (!typing || !canHighlightWhileTyping) {
        return null;
      }
      lastRunRef.current.time = Date.now();
      return getCached(code, language) ?? highlightCode(code, language);
    });

    const complete = useMemo(() => {
      if (typing || isDisabled) {
        return null;
      }
      // The last highlight made while typing usually covers the whole code.
      if (typed?.code === code && typed.language === language) {
        setCached(typed);
        return typed;
      }
      return highlightCached(code, language);
    }, [typing, isDisabled, code, language, typed]);

    // While typing, the block is highlighted at most every
    // `TYPING_HIGHLIGHT_INTERVAL` ms (longer for big blocks), the text that
    // arrived since then is shown as is.
    useEffect(() => {
      if (
        !typing ||
        !canHighlightWhileTyping ||
        (typed?.code === code && typed.language === language)
      ) {
        return undefined;
      }

      const { time, duration } = lastRunRef.current;
      const interval = Math.max(TYPING_HIGHLIGHT_INTERVAL, duration * 4);

      const timeoutId = setTimeout(
        () => {
          const start = Date.now();
          const highlighted = highlightCode(code, language);
          lastRunRef.current = {
            time: Date.now(),
            duration: Date.now() - start,
          };
          setTyped(highlighted);
        },
        Math.max(0, time + interval - Date.now()),
      );

      return () => clearTimeout(timeoutId);
    }, [typing, canHighlightWhileTyping, code, language, typed]);

    const highlighted = typing ? typed : complete;
    const isCurrent =
      !!highlighted &&
      highlighted.language === language &&
      code.startsWith(highlighted.code);
    const highlightedHtml = isCurrent ? highlighted.html : '';
    // Code that arrived after the last highlight.
    const rest = isCurrent ? code.slice(highlighted.code.length) : code;
    // While typing, the rest is a text node updated in place: setting the whole
    // HTML on every chunk made the browser parse the highlighted code again.
    const typedRest = typing ? rest : '';
    const html = typing ? highlightedHtml : highlightedHtml + escapeHtml(rest);
    // React sets the HTML again whenever it gets a new object.
    const innerHtml = useMemo(() => ({ __html: html }), [html]);

    const codeRef = useRef<HTMLElement>(null);
    const restNodeRef = useRef<Text | null>(null);

    useIsomorphicLayoutEffect(() => {
      const element = codeRef.current;
      let node = restNodeRef.current;

      if (!element || (!typedRest && !node)) {
        return;
      }

      if (!typedRest) {
        node?.remove();
        return;
      }

      if (!node) {
        node = document.createTextNode('');
        restNodeRef.current = node;
      }
      // React drops the node whenever it sets new HTML.
      if (element.lastChild !== node) {
        element.appendChild(node);
      }
      if (node.data !== typedRest) {
        node.data = typedRest;
      }
    }, [typedRest, html]);

    // Added like `classList.add` does: without duplicates.
    const classNames = new Set(className.split(/\s+/).filter(Boolean));
    if (!isDisabled) {
      classNames.add('hljs');
    }
    if (isCurrent) {
      classNames.add(highlighted.languageClassName);
    }

    return (
      <pre>
        <code
          ref={codeRef}
          className={isDisabled ? className : [...classNames].join(' ')}
          data-highlighted={isCurrent ? 'yes' : undefined}
          // highlight.js escapes the code.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={innerHtml}
        />
      </pre>
    );
  },
);
