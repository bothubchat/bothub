import { css, keyframes, styled } from 'styled-components';

import { Button } from '@/ui/components/button';

import { CloseIcon } from '@/ui/icons/close';
import { SelectorIcon } from '@/ui/icons/selector';
import { TextField } from '@/ui/components/text-field';

const ColorPickerMenuAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`;

export interface ColorPickerMenuStyledProps {
  $centeredX?: boolean;
}

export const ColorPickerMenuStyled = styled.div<ColorPickerMenuStyledProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 256px;
  background-color: ${({ theme }) => theme.colors.base.black};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  padding: 8px;
  border-radius: 10px;
  position: absolute;
  bottom: 40px;
  left: ${({ $centeredX }) => ($centeredX ? `0` : css`calc(100% + 8px)`)};
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
  variant: 'secondary'
})`
  width: 81px;
  height: 28px;
  padding-block: 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  label {
    background: none;

    input {
      text-align: center;
      font-weight: 600;
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
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
`;

export const ColorPickerMenuCloseButton = styled(Button).attrs({
  children: <CloseIcon />,
  variant: 'text'
})``;

export const ColorPickerMenuArea = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  cursor: pointer;
  background-blend-mode: multiply;
`;

export const ColorPickerMenuHueSlider = styled.div`
  position: relative;
  height: 16px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
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

export const ColorPickerMenuSelector = styled.div.attrs({
  children: <SelectorIcon />
})`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -50%);
`;
