import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { PortalElement, portalId } from './styled';

export interface PortalProps extends React.PropsWithChildren {
  element?: Element | null;
}

export const Portal: React.FC<PortalProps> = ({ children, ...props }) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (typeof props.element !== 'undefined') {
      setElement(props.element);
    } else {
      setElement(
        document.querySelector(String(PortalElement)) ??
          document.getElementById(portalId),
      );
    }
  }, [props.element]);

  if (element === null) {
    return null;
  }

  return ReactDOM.createPortal(children, element);
};

export * from './styled';
