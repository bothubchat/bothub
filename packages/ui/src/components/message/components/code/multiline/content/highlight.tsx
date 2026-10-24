import React, { useEffect, useRef, ReactNode, memo } from 'react';
import hljs from 'highlight.js/lib/common';
import { useMessageCodeTyping } from './typing';

hljs.configure({
  ignoreUnescapedHTML: true,
});

export interface HighlightProps {
  children: ReactNode;
  className?: string;
}

export const Highlight: React.FC<HighlightProps> = memo(
  ({ children, className = '' }) => {
    const elRef = useRef<HTMLElement>(null);
    const highlightedRef = useRef<string | null>(null);
    const typing = useMessageCodeTyping();

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;

      const code = String(children ?? '');
      const key = `${className}\n${code}`;

      // Highlighted code stays as is while other code of the block is typed.
      if (highlightedRef.current === key) return;

      // hljs adds the `language-*` class it used or guessed: left on the
      // element, it would be reused for the next code instead of a new guess.
      el.className = typing ? `${className} hljs` : className;
      el.textContent = code;
      delete el.dataset.highlighted;
      highlightedRef.current = null;

      if (typing) return;

      hljs.highlightElement(el);
      highlightedRef.current = key;
    }, [className, children, typing]);

    return (
      <pre>
        <code
          className={className}
          ref={elRef}
        />
      </pre>
    );
  },
);
