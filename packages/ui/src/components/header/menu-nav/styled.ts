import { css, styled } from 'styled-components';
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
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    position: relative;
    z-index: 10;
    padding: 30px 40px;
    height: auto;
  }
`;

export const HeaderMenuNavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    flex-direction: column;
    gap: 30px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    gap: 24px;
  }
`;

export const HeaderMenuNavItem = styled.li`
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const HeaderMenuNavLabel = styled(Typography).attrs<{
  variant?: string;
}>(({ variant = 'body-m-semibold' }) => ({
  variant,
}))`
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

export const HeaderMenuNavContent = styled.div<{ $open?: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  background: ${({ theme }) => theme.colors.base.black};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 17px;
  position: absolute;
  top: 84px;
  gap: 12px;
  left: 0px;
  padding: 16px;
  width: fit-content;
  overflow: hidden;
`;

export const HeaderMenuNavContentList = styled(animated.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderMenuNavContentMobile = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 14px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    flex-direction: column;
  }
`;

export const HeaderMenuNavContentChildList = styled(animated.div)<{
  $columns?: number;
}>`
  display: grid;
  grid-template-columns: ${({ $columns = 1 }) =>
    `repeat(${$columns}, max-content)`};
  flex-direction: column;
  row-gap: 8px;
  column-gap: 16px;
  width: 100%;
`;

export const HeaderMenuNavItemArrowIcon = styled(ArrowNarrowDownIcon).attrs({
  fill: '#fff',
  size: 18,
})`
  rotate: -135deg;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    display: none;
  }
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
  $minWidth?: number;
  $subLink?: boolean;
}>`
  padding: 12px 14px;
  display: flex;
  min-width: ${({ $minWidth }) => $minWidth ?? 250}px;
  align-items: center;
  height: fit-content;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease-in-out;
  ${({ $active, theme }) =>
    $active &&
    `
    outline: 1px solid ${theme.colors.grayScale.gray3};
    background: ${theme.colors.gradient.elite20};
  `}
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    width: 100%;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    background: inherit;
    outline: none;
    padding: 12px 0;
  }
`;

export const HeaderMenuNavLink = styled.a<{
  $active?: boolean;
  $height?: 'fit' | 'auto';
}>`
  padding: 12px 14px;
  display: flex;
  height: ${({ $height }) => ($height === 'fit' ? 'auto' : 'fit-content')};
  min-width: 406px;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  background: transparent;
  outline: none;
  border: none;
  transition: background 0.2s ease-in-out;
  ${({ theme }) => css`
    &:hover {
      outline: 1px solid ${theme.colors.grayScale.gray3};
      background: ${colorToRgba(theme.colors.accent.primary, 0.2)};
      ${`& ${HeaderMenuNavItemBgIcon} {
          background: ${theme.colors.accent.primary};
        }`}
    }
  `}
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    min-width: unset;
    padding-right: 0;
  }
`;

export const HeaderMenuNavMainLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

export const HeaderMenuNavTextLink = styled(Typography).attrs({
  variant: 'body-m-regular',
})`
  width: 100%;
  white-space: wrap;
`;
export const HeaderMenuNavTextDescription = styled(Typography).attrs({
  variant: 'body-m-regular',
})`
  width: 100%;
  white-space: wrap;
  max-width: 406px;
`;

export const HeaderMenuNavArrowIcon = styled(ArrowDownIcon)`
  rotate: -90deg;
`;
