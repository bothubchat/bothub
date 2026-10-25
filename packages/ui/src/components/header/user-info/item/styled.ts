import { styled } from 'styled-components';
import { themeVar } from '@/ui/theme';

export const HeaderUserInfoItemStyled = styled.a`
  display: inline-flex;
  width: 100%;
`;

export const HeaderUserInfoItemContent = styled.span`
  display: inline-flex;
  width: 100%;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => themeVar(theme, 'colors.base.white')};
  line-height: 18px;
  gap: 10px;
  cursor: pointer;
  box-sizing: border-box;
  background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
  transition: background 0.3s ease-out;
  &:hover {
    background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  }
`;
