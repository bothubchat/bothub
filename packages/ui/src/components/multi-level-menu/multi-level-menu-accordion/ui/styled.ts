import { styled } from 'styled-components';
import { animated, AnimatedProps } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons';

export const MultiLevelMenuFirstLevelWrapper: React.FC<
  AnimatedProps<React.ComponentProps<'ul'>> & { $open: boolean }
> = styled(animated.ul)`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  user-select: none;
  row-gap: 8px;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};

  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    position: relative;
  }
  @media (min-width: ${({ theme }) => theme.tablet.maxWidth}) {
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
  color: ${({ theme, $open }) =>
    $open ? theme.colors.accent.primaryLight : theme.colors.base.white};
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
