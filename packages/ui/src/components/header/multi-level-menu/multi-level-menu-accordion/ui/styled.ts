import { styled } from 'styled-components';
import { animated, AnimatedProps } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons';
import { colorToRgba } from '@/ui/utils';
import { MultiLevelMenuSecondLevelArrowRight45 } from '@/ui/index';

export const MultiLevelMenuFirstLevelWrapper: React.FC<
  AnimatedProps<React.ComponentProps<'div'>> & { $open: boolean }
> = styled(animated.div)`
  display: flex;
  user-select: none;
  @media (min-width: ${({ theme }) => theme.tablet.maxWidth}) {
    position: absolute;
    top: 77px;
    left: 0;
    border-radius: 17px;
    padding: 16px;
    max-width: 1169px;
    width: 1169px;
    background-color: ${({ theme }) => theme.colors.base.black};
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.grayScale.gray2};
  }
`;
export const MultiLevelMenuFirstLevelUl = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const MultiLevelMenuHeader = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    margin-bottom: ${({ $active }) => $active && '14px'};
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    margin-bottom: ${({ $active }) => $active && '10px'};
  }
`;

export const MultiLevelMenuLi = styled.li`
  list-style: none;
`;

export const MultiLevelMenuTitle = styled(Typography).attrs({
  variant: 'body-l-semibold'
})<{ $open: boolean }>`
  transition: color 0.2s ease-in-out;
  @media (min-width: ${({ theme }) => theme.tablet.maxWidth}) {
    color: ${({ theme, $open }) =>
      $open ? theme.colors.accent.primaryLight : theme.colors.base.white};
  }
`;

export const MultiLevelMenuArrowDownIcon = styled(ArrowDownIcon)<{
  $open: boolean;
}>`
  transition: transform 0.2s ease-in-out;
  transform: ${({ $open }) => $open && 'rotate(180deg)'};
  display: none;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: inline-flex;
  }
`;

export const MultiLevelMenuSecondLevelHeader = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding-right: 6px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
`;

export const MultiLevelMenuSecondLevelHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MultiLevelMenuSecondLevelLiHover = styled.div`
  border-radius: 10px;
  height: 100%;
  transition: background 0.2s ease-in-out;
`;

export const MultiLevelMenuSecondLevelLi = styled.li<{ $even?: boolean }>`
  position: relative;
  list-style: none;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.grayScale.gray2};
  &:last-child {
    border-bottom: none;
  }
  ${({ $even, theme }) =>
    $even
      ? `
      @media (min-width: ${theme.tablet.maxWidth}) {
        &:nth-last-child(-n + 2) {
          border-bottom: none;
        }
      }
    `
      : `
      &:last-child {
        border-bottom: none;
      }
    `}
  &:hover {
    ${MultiLevelMenuSecondLevelLiHover} {
      background: ${({ theme }) =>
        colorToRgba(theme.colors.accent.primary, 0.2)};
    }
    ${MultiLevelMenuSecondLevelArrowRight45} {
      background: ${({ theme }) => theme.colors.accent.primary};
    }
  }
`;

export const MultiLevelMenuSecondLevelCardLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const MultiLevelMenuSecondLevelHeaderContent = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

export const MultiLevelMenuSecondLevelDescription = styled(Typography).attrs({
  variant: 'body-m-regular'
})`
  display: block;
  margin-top: 8px;
`;
export const MultiLevelMenuSecondLevelWrapper: React.FC<
  AnimatedProps<React.ComponentProps<'div'>>
> = styled(animated.div)`
  user-select: none;
  padding-left: 18px;
  flex-grow: 1;
`;
export const MultiLevelMenuSecondLevelContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  height: auto;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: flex;
    flex-direction: column;
  }
`;
export const MultiLevelMenuSecondLevelTitle = styled(Typography).attrs({
  variant: 'body-m-regular'
})``;

export const MultiLevelMenuSecondLevelSubTitle = styled(
  MultiLevelMenuSecondLevelTitle
)`
  color: ${({ theme }) => theme.colors.grayScale.gray6};
`;
