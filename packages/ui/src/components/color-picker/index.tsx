import { useCallback, useRef, useState } from 'react';

import {
  ColorPickerBottom,
  ColorPickerHex,
  ColorPickerLabel,
  ColorPickerPreview,
  ColorPickerStyled,
} from './styled';

import { ColorPickerMenu } from './menu';

export type ColorPickerChangeEventHandler = (color: string) => unknown;

export interface ColorPickerProps {
  label?: string;
  preview?: boolean;
  color?: string;
  onChange?: ColorPickerChangeEventHandler;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  preview = true,
  color = '#1c64f2',
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleChange = useCallback((color: string) => {
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
        {preview && <ColorPickerPreview style={{ backgroundColor: color }} />}
      </ColorPickerBottom>
      {open && (
        <ColorPickerMenu
          color={color}
          parentRef={ref}
          onChange={handleChange}
          onClose={() => setOpen(false)}
        />
      )}
    </ColorPickerStyled>
  );
};
