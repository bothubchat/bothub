import { useCallback, useEffect, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';
import { createPortal } from 'react-dom';
import {
  ColorPickerMenuArea,
  ColorPickerMenuCloseButton,
  ColorPickerMenuHeader,
  ColorPickerMenuHeaderHexCodeInput,
  ColorPickerMenuHeaderLeft,
  ColorPickerMenuHueSlider,
  ColorPickerMenuPreview,
  ColorPickerMenuSelector,
  ColorPickerMenuStyled,
} from './styled';
import { useTheme } from '@/ui/theme';
import { hexToRgb } from '@/ui/utils/colors/hexToRgb';
import { hsvToRgb } from '@/ui/utils/colors/hsvToRgb';
import { rgbToHex } from '@/ui/utils/colors/rgbToHex';
import { rgbToHsv } from '@/ui/utils/colors/rgbToHsv';
import { useEventCallback } from '@/ui/utils/useEventCallback';

export type ColorPickerMenuChangeEventHandler = (hex: string) => unknown;
export type ColorPickerMenuEventHandler = () => unknown;

export interface ColorPickerMenuProps {
  color?: string;
  parentRef?: React.MutableRefObject<HTMLDivElement | null>;
  onChange?: ColorPickerMenuChangeEventHandler;
  onClose?: ColorPickerMenuEventHandler;
}

// [hue 0-360 deg, saturation 0-100 %, brightness 0-100 %]
type Hsv = [number, number, number];

const defaultHsv: Hsv = [180, 100, 100];

const hexToHsv = (hex: string): Hsv => {
  try {
    return rgbToHsv(hexToRgb(hex));
  } catch {
    return defaultHsv;
  }
};

const isSameHsv = (a: Hsv, b: Hsv) =>
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

type GetDraggedHsv = (x: number, y: number, rect: DOMRect, prev: Hsv) => Hsv;

const getAreaHsv: GetDraggedHsv = (x, y, rect, [hue]) => [
  hue,
  clamp(Math.round((x / rect.width) * 100), 0, 100),
  clamp(Math.round(100 - (y / rect.height) * 100), 0, 100),
];

const getHueHsv: GetDraggedHsv = (x, _y, rect, [, saturation, brightness]) => [
  clamp(Math.round((x / rect.width) * 360), 0, 359),
  saturation,
  brightness,
];

export const ColorPickerMenu: React.FC<ColorPickerMenuProps> = ({
  color,
  parentRef,
  onChange,
  onClose,
}) => {
  const theme = useTheme();
  const initialColor = color ?? theme.colors.accent.primary;

  // Derived from the passed color without reporting it back: converting it
  // to HSV and back changes it slightly (#1c64f2 -> #1C63F2)
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(initialColor));
  const [hexColor, setHexColor] = useState<string>(() =>
    initialColor.toUpperCase(),
  );
  const hsvRef = useRef(hsv);
  const stopDragRef = useRef<(() => void) | null>(null);

  const { refs, floatingStyles } = useFloating({
    placement: 'right-end',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ fallbackAxisSideDirection: 'start' }),
      shift({ padding: 8 }),
    ],
  });

  const handleChange = useEventCallback(onChange);
  const handleClose = useEventCallback(onClose);

  const changeHsv = useCallback(
    (next: Hsv) => {
      if (isSameHsv(next, hsvRef.current)) {
        return;
      }

      const hex = rgbToHex(hsvToRgb(next));
      hsvRef.current = next;
      setHsv(next);
      setHexColor(hex);
      handleChange(hex);
    },
    [handleChange],
  );

  const startDrag = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, getHsv: GetDraggedHsv) => {
      stopDragRef.current?.();

      // Measured once per drag instead of on every mousemove
      const rect = event.currentTarget.getBoundingClientRect();
      const update = (clientX: number, clientY: number) => {
        changeHsv(
          getHsv(clientX - rect.left, clientY - rect.top, rect, hsvRef.current),
        );
      };

      let frameId = 0;
      let lastMove: MouseEvent | null = null;
      const listeners = new AbortController();

      const stopDrag = () => {
        cancelAnimationFrame(frameId);
        listeners.abort();
        stopDragRef.current = null;
      };

      // At most one update per frame
      const handleMouseMove = (moveEvent: MouseEvent) => {
        lastMove = moveEvent;
        if (frameId) {
          return;
        }

        frameId = requestAnimationFrame(() => {
          frameId = 0;
          if (lastMove) {
            update(lastMove.clientX, lastMove.clientY);
          }
        });
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        update(upEvent.clientX, upEvent.clientY);
        stopDrag();
      };

      update(event.clientX, event.clientY);
      document.addEventListener('mousemove', handleMouseMove, {
        signal: listeners.signal,
      });
      document.addEventListener('mouseup', handleMouseUp, {
        signal: listeners.signal,
      });
      stopDragRef.current = stopDrag;
    },
    [changeHsv],
  );

  // Don't leave document listeners behind when closed in the middle of a drag
  useEffect(() => () => stopDragRef.current?.(), []);

  const handleColorInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.toUpperCase();
      if (!/^#[\dABCDEF]{0,6}$/.test(val)) {
        return;
      }

      setHexColor(val);

      if (val.length === 7) {
        const next = hexToHsv(val);
        hsvRef.current = next;
        setHsv(next);
        handleChange(val);
      }
    },
    [handleChange],
  );

  const handleFocusInput = useCallback(() => {
    setHexColor('#');
  }, []);

  useEffect(() => {
    refs.setReference(parentRef?.current ?? null);
  }, [parentRef, refs]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        !parentRef?.current?.contains(target) &&
        !refs.floating.current?.contains(target)
      ) {
        handleClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [handleClose, parentRef, refs.floating]);

  const [hue, saturation, brightness] = hsv;
  const hueColor = `hsl(${hue}, 100%, 50%)`;

  return createPortal(
    <ColorPickerMenuStyled
      ref={refs.setFloating}
      style={floatingStyles}
    >
      <ColorPickerMenuHeader>
        <ColorPickerMenuHeaderLeft>
          <ColorPickerMenuHeaderHexCodeInput
            value={hexColor}
            onInput={handleColorInput}
            onFocus={handleFocusInput}
          />
          <ColorPickerMenuPreview style={{ backgroundColor: hexColor }} />
        </ColorPickerMenuHeaderLeft>
        <ColorPickerMenuCloseButton onClick={onClose} />
      </ColorPickerMenuHeader>
      <ColorPickerMenuArea
        style={{
          background: `
          linear-gradient(to right, white, ${hueColor}),
          linear-gradient(to top, black, transparent)
        `,
        }}
        onMouseDown={(e) => startDrag(e, getAreaHsv)}
      >
        <ColorPickerMenuSelector
          style={
            {
              '--selector-x': saturation,
              '--selector-y': 100 - brightness,
            } as React.CSSProperties
          }
        />
      </ColorPickerMenuArea>
      <ColorPickerMenuHueSlider onMouseDown={(e) => startDrag(e, getHueHsv)}>
        <ColorPickerMenuSelector
          style={
            {
              '--selector-x': (hue / 360) * 100,
              '--selector-y': 50,
            } as React.CSSProperties
          }
        />
      </ColorPickerMenuHueSlider>
    </ColorPickerMenuStyled>,
    document.body,
  );
};
