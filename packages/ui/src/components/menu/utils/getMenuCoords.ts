import { MenuPosition } from '../types';

export type MenuCoords = {
  top: number;
  left: number;
  minWidth?: number;
};

export type GetMenuCoordsParams = {
  triggerRect: DOMRect;
  dropdownWidth: number;
  dropdownHeight: number;
  position: MenuPosition;
  offset: number;
  viewportPadding?: number;
  flip?: boolean;
  matchTriggerWidth?: boolean;
};

export const getMenuCoords = ({
  triggerRect,
  dropdownWidth,
  dropdownHeight,
  position,
  offset,
  viewportPadding = 8,
  flip = true,
  matchTriggerWidth = false,
}: GetMenuCoordsParams): MenuCoords => {
  let left: number;

  switch (position) {
    case 'right':
      left = triggerRect.right - dropdownWidth;
      break;
    case 'center':
      left = triggerRect.left + (triggerRect.width - dropdownWidth) / 2;
      break;
    case 'left':
    default:
      left = triggerRect.left;
      break;
  }

  const maxLeft = window.innerWidth - dropdownWidth - viewportPadding;
  left = Math.max(viewportPadding, Math.min(left, maxLeft));

  let top = triggerRect.bottom + offset;

  if (flip && dropdownHeight > 0) {
    const spaceBelow = window.innerHeight - triggerRect.bottom - offset;
    const spaceAbove = triggerRect.top - offset;

    if (dropdownHeight > spaceBelow && spaceAbove > spaceBelow) {
      top = triggerRect.top - dropdownHeight - offset;
    }
  }

  const maxTop = window.innerHeight - dropdownHeight - viewportPadding;
  top = Math.max(viewportPadding, Math.min(top, maxTop));

  return {
    top,
    left,
    ...(matchTriggerWidth ? { minWidth: triggerRect.width } : {}),
  };
};
