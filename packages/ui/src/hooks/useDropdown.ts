import { useRef } from 'react';
import { useTransition } from '@react-spring/web';

export interface UseDropdownOptions {
  isOpen: boolean;
  transitionDuration?: number;
}

const DEFAULT_TRANSITION_DURATION = 150;

export const useDropdown = ({
  isOpen,
  transitionDuration = DEFAULT_TRANSITION_DURATION,
}: UseDropdownOptions) => {
  const ref = useRef<HTMLDivElement>(null);

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0)',
    },
    enter: {
      opacity: isOpen ? 1 : 0.5,
      transform: `scale(${isOpen ? 1 : 0.999})`,
    },
    leave: { opacity: 0, transform: 'scale(0.999)' },
    config: { duration: transitionDuration },
  });

  return {
    ref,
    dropdownTransition,
  };
};
