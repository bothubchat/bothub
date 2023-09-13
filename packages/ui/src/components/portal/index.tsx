import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const elementRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    elementRef.current = document.querySelector('#bothub_portal');
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (!elementRef.current) {
    return children;
  }

  return ReactDOM.createPortal(children, elementRef.current);
};

export const PortalElement: React.FC = () => <div id="bothub_portal" />;
