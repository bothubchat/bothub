import { css, keyframes, styled } from 'styled-components';

import { Button } from '@/ui/components/button';

import { CloseIcon } from '@/ui/icons/close';
import { SelectorIcon } from '@/ui/icons/selector';
import { TextField } from '@/ui/components/text-field';
import { isBright } from '@/ui/utils';
import { themeVar } from '@/ui/theme';

const ColorPickerMenuAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ColorPickerMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 256px;
  background-color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray3')};
  padding: 8px;
  border-radius: 10px;
  animation: ${ColorPickerMenuAnimation} 0.1s ease-out;
  z-index: ${({ theme }) => theme.zIndex.menu};
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
`;

export const ColorPickerMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ColorPickerMenuHeaderHexCodeInput = styled(TextField).attrs({
  variant: 'secondary',
})`
  width: 81px;
  height: 28px;
  padding-block: 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  background-color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
  label {
    background: none;

    input {
      text-align: center;
      font-weight: 600;

      ${({ theme }) =>
        isBright(theme.colors.grayScale.gray4) &&
        css`
          color: ${themeVar(theme, 'default.colors.base.black')};
        `}
    }
  }
`;

export const ColorPickerMenuHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ColorPickerMenuPreview = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
`;

export const ColorPickerMenuCloseButton = styled(Button).attrs({
  children: <CloseIcon />,
  variant: 'text',
})``;

export const ColorPickerMenuArea = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  cursor: pointer;
  background-blend-mode: multiply;
  container-type: size;
`;

export const ColorPickerMenuHueSlider = styled.div`
  position: relative;
  height: 16px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  container-type: size;
  background: linear-gradient(
    to right,
    #ff0000,
    #ff9000,
    #fbff00,
    #09ff00,
    #00ffea,
    #2f00ff,
    #ff00f6,
    #ff0004
  );
`;

// Positioned through --selector-x/--selector-y (percent of the area), so
// moving it doesn't generate classes. Container units let it move with a
// transform instead of left/top, which would cause layout on every move
export const ColorPickerMenuSelector = styled.div.attrs({
  children: <SelectorIcon />,
})`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(var(--selector-x, 0) * 1%);
  top: calc(var(--selector-y, 0) * 1%);
  transform: translate(-50%, -50%);
  @supports (width: 1cqw) {
    left: 0;
    top: 0;
    transform: translate(
      calc(var(--selector-x, 0) * 1cqw - 50%),
      calc(var(--selector-y, 0) * 1cqh - 50%)
    );
  }
`;
