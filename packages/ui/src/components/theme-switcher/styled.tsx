import { css, styled } from 'styled-components';
import { ThemeSwitcherMode } from './types';

export const ThemeSwitcherStyled = styled.div`
  display: inline-flex;
  width: fit-content;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  border: none;
  border-radius: 200px;
  padding: 2px;
`;

export const ThemeSwitcherList = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  position: relative;
`;

export const ThemeSwitcherItem = styled.button`
  all: unset;
  display: inline-flex;
  position: relative;
  border-radius: 12px;
  width: 100%;
  padding: 6px;
`;

export interface ThemeSwitcherItemBackgroundProps {
  $mode: ThemeSwitcherMode;
}

export const ThemeSwitcherItemBackground = styled.span<ThemeSwitcherItemBackgroundProps>`
  display: inline-flex;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  height: 100%;
  aspect-ratio: 1 / 1;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  ${({ $mode }) => {
    switch ($mode) {
      case 'light':
        return css`
          left: 20px;
        `;
      case 'dark':
        return css`
          left: 50%;
        `;
      case 'system':
        return css`
          left: calc(100% - 21px);
        `;
    }
  }};
  transform: translateX(-50%);
  transition: all 0.2s ease-out;
`;

export const ThemeSwitcherItemContent = styled.span`
  display: inline-flex;
  position: relative;
  padding: 4px;
  width: 100%;
  justify-content: center;
`;
