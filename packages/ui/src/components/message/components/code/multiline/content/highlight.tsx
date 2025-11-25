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
      if (!elRef.current) {
        return;
      }

      hljs.highlightElement(elRef.current);
    }, [className, children]);

    return (
      <pre>
        <code
          className={className}
          ref={elRef}
        >
          {children}
        </code>
      </pre>
    );
  },
);
