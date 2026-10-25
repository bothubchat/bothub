import { useEffect, useMemo } from 'react';
import { useEventCallback } from '@/ui/utils';

interface EscapeLayer {
  order: number;
  onEscape: () => void;
}

// Open overlays (modals, menus, drawers) in the order they were opened.
// Only the topmost one reacts to Escape, so closing a menu inside a modal
// doesn't close the modal too.
const layers: EscapeLayer[] = [];
let lastOrder = 0;

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') {
    return;
  }

  const topLayer = layers[layers.length - 1];
  if (!topLayer) {
    return;
  }

  event.stopPropagation();
  topLayer.onEscape();
};

/**
 * Calls `onEscape` when Escape is released while `enabled` is true and no
 * overlay was opened after this one.
 */
export const useEscapeLayer = (enabled: boolean, onEscape: () => void) => {
  const handleEscape = useEventCallback(onEscape);
  // Taken while rendering: overlays opened in the same commit are ordered
  // parent first, while their effects run children first
  const order = useMemo(() => ++lastOrder, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const layer: EscapeLayer = { order, onEscape: handleEscape };
    const index = layers.findIndex((item) => item.order > order);
    layers.splice(index === -1 ? layers.length : index, 0, layer);
    if (layers.length === 1) {
      document.addEventListener('keyup', handleKeyUp, true);
    }

    return () => {
      const layerIndex = layers.indexOf(layer);
      if (layerIndex !== -1) {
        layers.splice(layerIndex, 1);
      }
      if (layers.length === 0) {
        document.removeEventListener('keyup', handleKeyUp, true);
      }
    };
  }, [enabled, order, handleEscape]);
};
