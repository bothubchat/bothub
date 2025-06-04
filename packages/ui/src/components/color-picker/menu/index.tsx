import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ColorPickerMenuArea,
  ColorPickerMenuCloseButton,
  ColorPickerMenuHeader,
  ColorPickerMenuHeaderHexCode,
  ColorPickerMenuHeaderLeft,
  ColorPickerMenuHueSlider,
  ColorPickerMenuPreview,
  ColorPickerMenuSelector,
  ColorPickerMenuStyled
} from './styled';
import { useTheme } from '@/ui/theme';
import { getRgbFromHex, getHsvFromRgb } from '@/ui/utils/colors';

const rgbToHex = (x: number): string => {
  const hex = Math.round(x * 255).toString(16);
  return `${hex.length === 1 ? '0' : ''}${hex}`;
};

const hsvToRgb = ({
  h,
  s,
  v
}: {
  h: number;
  s: number;
  v: number;
}): { r: number; g: number; b: number } => {
  let r: number;
  let g: number;
  let b: number;

  const hueSector = Math.floor(h / 60);
  const remainder = h / 60 - hueSector;
  const minValue = v * (1 - s);
  const midValue1 = v * (1 - remainder * s);
  const midValue2 = v * (1 - (1 - remainder) * s);

  switch (hueSector % 6) {
    case 0:
      r = v;
      g = midValue2;
      b = minValue;
      break;
    case 1:
      r = midValue1;
      g = v;
      b = minValue;
      break;
    case 2:
      r = minValue;
      g = v;
      b = midValue2;
      break;
    case 3:
      r = minValue;
      g = midValue1;
      b = v;
      break;
    case 4:
      r = midValue2;
      g = minValue;
      b = v;
      break;
    case 5:
    default:
      r = v;
      g = minValue;
      b = midValue1;
      break;
  }
  return { r, g, b };
};

export type ColorPickerMenuChangeEventHandler = (hex: string) => unknown;
export type ColorPickerMenuEventHandler = () => unknown;

export interface ColorPickerMenuProps {
  color?: string;
  parentRef?: React.MutableRefObject<HTMLDivElement | null>;
  onChange?: ColorPickerMenuChangeEventHandler;
  onClose?: ColorPickerMenuEventHandler;
}

export const ColorPickerMenu: React.FC<ColorPickerMenuProps> = ({
  color,
  parentRef,
  onChange,
  onClose
}) => {
  const theme = useTheme();

  const [hue, setHue] = useState<number>(180); // [0 - 360] deg
  const [saturation, setSaturation] = useState<number>(100); // [0 - 100] %
  const [brightness, setBrightness] = useState<number>(100); // [0 - 100] %
  const [hexColor, setHexColor] = useState<string>(
    (color ?? theme.colors.accent.primary).toUpperCase()
  );

  const [centeredX, setCenteredX] = useState<boolean>(false);

  const initial = useRef<boolean>(true);

  const hueSliderRef = useRef<HTMLDivElement>(null);
  const colorAreaRef = useRef<HTMLDivElement>(null);

  const handleHueChange = useCallback((e: MouseEvent) => {
    if (!hueSliderRef.current) return;

    const rect = hueSliderRef.current.getBoundingClientRect();
    const { width } = rect;
    const x = e.clientX - rect.left;

    const newHue = Math.max(0, Math.min(359, Math.round((x / width) * 360)));
    setHue(newHue);
  }, []);

  const handleColorChange = useCallback((e: MouseEvent) => {
    if (!colorAreaRef.current) return;

    const rect = colorAreaRef.current.getBoundingClientRect();
    const { width, height } = rect;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSaturation = Math.max(
      0,
      Math.min(100, Math.round((x / width) * 100))
    );
    const newBrightness = Math.max(
      0,
      Math.min(100, Math.round(100 - (y / height) * 100))
    );

    setSaturation(newSaturation);
    setBrightness(newBrightness);
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent, callback: (e: MouseEvent) => unknown) => {
      callback(e);

      const handleMouseMove = (e: MouseEvent) => {
        callback(e);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    []
  );

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (!initial.current && !parentRef?.current?.contains(e.target as Node)) {
      onClose?.();
    }
  }, []);

  useEffect(() => {
    const rect = parentRef?.current?.getBoundingClientRect?.();
    if (window.innerWidth - (rect?.right ?? 0) <= 250) {
      setCenteredX(true);
      return;
    }
    setCenteredX(false);
  }, []);

  useEffect(() => {
    if (!initial.current || !color) return;

    const rgb = getRgbFromHex(color);
    const [h, s, v] = getHsvFromRgb(rgb);

    setHue(h);
    setSaturation(s);
    setBrightness(v);
  }, []);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const { r, g, b } = hsvToRgb({
      h: hue,
      s: saturation / 100,
      v: brightness / 100
    });

    const hex = `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`.toUpperCase();

    setHexColor(hex);
    onChange?.(hex);
  }, [hue, saturation, brightness]);

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const hueColor = `hsl(${hue}, 100%, 50%)`;
  const huePosition = `${(hue / 360) * 100}%`;
  const colorPositionX = `${saturation}%`;
  const colorPositionY = `${100 - brightness}%`;

  return (
    <ColorPickerMenuStyled $centeredX={centeredX}>
      <ColorPickerMenuHeader>
        <ColorPickerMenuHeaderLeft>
          <ColorPickerMenuHeaderHexCode>
            {hexColor}
          </ColorPickerMenuHeaderHexCode>
          <ColorPickerMenuPreview style={{ backgroundColor: hexColor }} />
        </ColorPickerMenuHeaderLeft>
        <ColorPickerMenuCloseButton onClick={onClose} />
      </ColorPickerMenuHeader>
      <ColorPickerMenuArea
        ref={colorAreaRef}
        style={{
          background: `
          linear-gradient(to right, white, ${hueColor}), 
          linear-gradient(to top, black, transparent)
        `
        }}
        // @ts-ignore
        onMouseDown={(e) => handleMouseDown(e, handleColorChange)}
      >
        <ColorPickerMenuSelector
          style={{
            top: colorPositionY,
            left: colorPositionX
          }}
        />
      </ColorPickerMenuArea>
      <ColorPickerMenuHueSlider
        ref={hueSliderRef}
        // @ts-ignore
        onMouseDown={(e) => handleMouseDown(e, handleHueChange)}
      >
        <ColorPickerMenuSelector
          style={{
            top: '50%',
            left: huePosition
          }}
        />
      </ColorPickerMenuHueSlider>
    </ColorPickerMenuStyled>
  );
};
