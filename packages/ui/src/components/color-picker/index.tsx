import { useCallback, useRef, useState } from 'react';

import {
  ColorPickerBottom,
  ColorPickerHex,
  ColorPickerLabel,
  ColorPickerPreview,
  ColorPickerStyled
} from './styled';

import { ColorPickerMenu } from './menu';
import { useTheme } from '@/ui/theme';

export type ColorPickerChangeEventHandler = (color: string) => unknown;

export interface ColorPickerProps {
  label?: string;
  preview?: boolean;
  initialColor?: string;
  onChange?: ColorPickerChangeEventHandler;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  preview = true,
  initialColor,
  onChange
}) => {
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const [color, setColor] = useState<string>(
    (initialColor ?? theme.colors.accent.primary).toUpperCase()
  );

  const handleChange = useCallback((color: string) => {
    setColor(color);
    onChange?.(color);
  }, []);

  return (
    <ColorPickerStyled ref={ref}>
      {label && <ColorPickerLabel>{label}</ColorPickerLabel>}
      <ColorPickerBottom
        $active={open}
        onClick={() => setOpen(!open)}
      >
        <ColorPickerHex>{color}</ColorPickerHex>
        {preview && <ColorPickerPreview $color={color} />}
      </ColorPickerBottom>
      <ColorPickerMenu
        open={open}
        initialColor={initialColor}
        parentRef={ref}
        onChange={handleChange}
        onClose={() => setOpen(false)}
      />
    </ColorPickerStyled>
  );
};
