import React, {
  useEffect,
  useRef,
  ReactNode,
  ElementType,
  useCallback
} from 'react';
import hljs from 'highlight.js/lib/common';

export interface HighlightProps {
  children: ReactNode;
  className?: string;
  element?: ElementType;
  innerHTML?: boolean;
}

export const Highlight: React.FC<HighlightProps> = ({
  children,
  className = '',
  element: Element,
  innerHTML = false
}) => {
  const elRef = useRef<HTMLDivElement | HTMLPreElement>(null);

  const highlightCode = useCallback(() => {
    if (!elRef.current) return;
    const nodes = elRef.current.querySelectorAll('pre code');

    for (let i = 0; i < nodes.length; i++) {
      hljs.highlightElement(nodes[i] as HTMLElement);
    }
  }, []);

  useEffect(() => {
    highlightCode();
  }, [className, children, highlightCode]);

  if (innerHTML) {
    const props = {
      ref: elRef,
      className,
      dangerouslySetInnerHTML: { __html: children as string }
    };
    if (Element) {
      return <Element {...props} />;
    }

    return (
      <div
        {...props}
        ref={elRef as React.RefObject<HTMLDivElement>}
      />
    );
  }

  if (Element) {
    return (
      <Element
        ref={elRef}
        className={className}
      >
        {children}
      </Element>
    );
  }

  return (
    <pre ref={elRef as React.RefObject<HTMLPreElement>}>
      <code className={className}>{children}</code>
    </pre>
  );
};
