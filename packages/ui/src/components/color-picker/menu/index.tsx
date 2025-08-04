import { useCallback, useEffect, useRef, useState } from 'react';
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
  onClose,
}) => {
  const theme = useTheme();

  const [hue, setHue] = useState<number>(180); // [0 - 360] deg
  const [saturation, setSaturation] = useState<number>(100); // [0 - 100] %
  const [brightness, setBrightness] = useState<number>(100); // [0 - 100] %
  const [hexColor, setHexColor] = useState<string>(
    (color ?? theme.colors.accent.primary).toUpperCase(),
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
      Math.min(100, Math.round((x / width) * 100)),
    );
    const newBrightness = Math.max(
      0,
      Math.min(100, Math.round(100 - (y / height) * 100)),
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
    [],
  );

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (!initial.current && !parentRef?.current?.contains(e.target as Node)) {
      onClose?.();
    }
  }, []);

  const handleColorInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.toUpperCase();
      if (/^#[\dABCDEF]{0,6}$/.test(val)) {
        if (val.length === 7) {
          const rgb = hexToRgb(val);
          const [h, s, v] = rgbToHsv(rgb);

          setHue(h);
          setSaturation(s);
          setBrightness(v);

          return;
        }

        setHexColor(val);
      }
    },
    [],
  );

  const handleFocusInput = useCallback(() => {
    setHexColor('#');
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

    const rgb = hexToRgb(color);
    const [h, s, v] = rgbToHsv(rgb);

    setHue(h);
    setSaturation(s);
    setBrightness(v);
  }, []);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const rgb = hsvToRgb([hue, saturation, brightness]);

    const hex = rgbToHex(rgb);

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
        ref={colorAreaRef}
        style={{
          background: `
          linear-gradient(to right, white, ${hueColor}), 
          linear-gradient(to top, black, transparent)
        `,
        }}
        // @ts-ignore
        onMouseDown={(e) => handleMouseDown(e, handleColorChange)}
      >
        <ColorPickerMenuSelector
          style={{
            top: colorPositionY,
            left: colorPositionX,
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
            left: huePosition,
          }}
        />
      </ColorPickerMenuHueSlider>
    </ColorPickerMenuStyled>
  );
};
