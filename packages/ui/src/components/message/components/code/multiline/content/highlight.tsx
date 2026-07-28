import React, { useEffect, useRef, ReactNode, memo } from 'react';
import hljs from 'highlight.js/lib/common';

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

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;

      el.textContent = String(children ?? '');
      delete el.dataset.highlighted;
      hljs.highlightElement(el);
    }, [className, children]);

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
