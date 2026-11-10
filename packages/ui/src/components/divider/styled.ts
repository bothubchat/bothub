import { styled } from 'styled-components';
import { themeVar } from '@/ui/theme';

export const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  padding: 2px 0;

  & * {
    color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
  }
`;

export const DividerStyled = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
`;
