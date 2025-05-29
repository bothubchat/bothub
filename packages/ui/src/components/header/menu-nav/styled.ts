import styled from 'styled-components';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon, ArrowNarrowDownIcon } from '@/ui/icons';
import { colorToRgba } from '@/ui/utils';

export const HeaderMenuNavStyled = styled.div`
  padding-left: 20px;
  border-left: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  height: 34px;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const HeaderMenuNavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  width: 100%;
  gap: 20px;
`;

export const HeaderMenuNavItem = styled.li`
  cursor: pointer;
`;

export const HeaderMenuNavLabel = styled(Typography).attrs({
  variant: 'body-m-semibold'
})``;

export const HeaderMenuNavContent = styled(animated.div)`
  display: flex;
  background: ${({ theme }) => theme.colors.base.black};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 17px;
  position: absolute;
  top: 84px;
  gap: 12px;
  left: 0px;
  padding: 16px;
  width: max-content;
  overflow: hidden;
`;

export const HeaderMenuNavContentList = styled(animated.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderMenuNavContentChildList = styled(animated.div)<{
  $columns?: number;
}>`
  display: grid;
  grid-template-columns: ${({ $columns = 1 }) => `repeat(${$columns}, 1fr)`};
  flex-direction: column;
  row-gap: 8px;
  column-gap: 16px;
  transition: all;
  width: 100%;
`;

export const HeaderMenuNavItemArrowIcon = styled(ArrowNarrowDownIcon).attrs({
  fill: '#fff',
  size: 18
})`
  rotate: -135deg;
`;

export const HeaderMenuNavItemBgIcon = styled.div`
  width: 30px;
  height: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderMenuNavMainLink = styled.a<{
  $active?: boolean;
}>`
  padding: 12px 14px;
  display: flex;
  min-width: 250px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease-in-out;
  ${({ $active, theme }) =>
    $active
      ? `
    outline: 1px solid ${theme.colors.grayScale.gray3};
    background: ${theme.colors.gradient.elite20};
  `
      : `
  &:hover {
    outline: 1px solid ${theme.colors.grayScale.gray3};
    background: ${colorToRgba(theme.colors.accent.primary, 0.2)};
    ${`& ${HeaderMenuNavItemBgIcon} {
      background: ${theme.colors.accent.primary};
    }`}
  }
  `}
`;

export const HeaderMenuNavTextLink = styled(Typography).attrs({
  variant: 'body-m-semibold'
})`
  width: 100%;
`;

export const HeaderMenuNavArrowIcon = styled(ArrowDownIcon)`
  rotate: -90deg;
`;
