import { useEffect, useState } from 'react';

export const UseDelayedVisibleDefaultProps = {
  showDelay: 150,
  hideDelay: 150,
};

export const useDelayedVisible = (
  visible: boolean,
  showDelay = 150,
  hideDelay = 150,
) => {
  const [delayedVisible, setDelayedVisible] = useState(visible);

  useEffect(() => {
    // false -> true
    if (visible && !delayedVisible) {
      const timeout = setTimeout(() => setDelayedVisible(true), showDelay);
      return () => clearTimeout(timeout);
    }

    // true -> false
    if (!visible && delayedVisible) {
      const timeout = setTimeout(() => setDelayedVisible(false), hideDelay);
      return () => clearTimeout(timeout);
    }
  }, [visible, delayedVisible, showDelay]);

  return { delayedVisible, mounted: visible || delayedVisible };
};
