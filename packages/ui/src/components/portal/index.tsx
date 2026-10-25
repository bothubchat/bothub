import React, {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import ReactDOM from 'react-dom';
import { PortalElement, portalId } from './styled';

export interface PortalProps extends React.PropsWithChildren {
  element?: Element | null;
}

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const findPortalElement = (): Element | null =>
  document.querySelector(String(PortalElement)) ??
  document.getElementById(portalId);

export const Portal: React.FC<PortalProps> = ({ children, ...props }) => {
  // `false` on the server and while hydrating, `true` in a regular client
  // render, so a client mount doesn't need an extra render to find the target.
  const isClient = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );
  const resolvedElement = useMemo<Element | null>(() => {
    if (!isClient) {
      return null;
    }
    if (typeof props.element !== 'undefined') {
      return props.element;
    }

    return findPortalElement();
  }, [isClient, props.element]);
  // The portal target may be mounted later in the same commit (after this
  // component), so look it up again once the commit is done.
  const [lateElement, setLateElement] = useState<Element | null>(null);

  useEffect(() => {
    if (
      isClient &&
      resolvedElement === null &&
      typeof props.element === 'undefined'
    ) {
      setLateElement(findPortalElement());
    }
  }, [isClient, resolvedElement, props.element]);

  const element =
    resolvedElement ??
    (typeof props.element === 'undefined' ? lateElement : null);

  if (element === null) {
    return null;
  }

  return ReactDOM.createPortal(children, element);
};

export * from './styled';
