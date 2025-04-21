import { styled } from 'styled-components';
import { animated, AnimatedProps } from '@react-spring/web';
import { ArrowDownIcon, ArrowNarrowRightIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';

export const MultiLevelFirstLevelMenuLi = styled.li<{
  $gotChild: boolean;
  $active: boolean;
}>`
  display: flex;
  list-style: none;
  width: ${({ $active }) => ($active ? 'auto' : 'fit-content')};
  align-items: start;
  transition: all 0.5s ease-in;
  &:hover {
    width: ${({ $gotChild }) => $gotChild && 'auto'};
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export const MultiLevelMenuFirsLevelTitle = styled(Typography).attrs({
  variant: 'body-m-medium'
})``;

export const MultiLevelMenuSecondLevelTitle = styled(Typography).attrs({
  variant: 'body-m-regular'
})``;

export const MultiLevelMenuSecondLevelSubTitle = styled(
  MultiLevelMenuSecondLevelTitle
)`
  color: ${({ theme }) => theme.colors.grayScale.gray6};
`;

export const MultiLevelMenuSecondLevelWrapper: React.FC<
  AnimatedProps<React.ComponentProps<'div'>> & { $open: boolean }
> = styled(animated.ul)`
  user-select: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  padding-left: 18px;
  flex-grow: 1;
  ${MultiLevelFirstLevelMenuLi}:hover & {
    display: flex;
  }
`;

export const MultiLevelMenuFirsLevelHeader = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 250px;
  width: 250px;
  border: 1px solid;
  border-color: transparent;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(90deg, rgba(28, 100, 242, 0.2) -0.39%, rgba(212, 28, 242, 0.2) 99.61%)'
      : 'transparent'};
  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.grayScale.gray3 : 'transparent'};
  border-radius: ${({ $active }) => ($active ? '10px' : '10px')};

  &:hover,
  ${MultiLevelFirstLevelMenuLi}:hover & {
    background: linear-gradient(
      90deg,
      rgba(28, 100, 242, 0.2) -0.39%,
      rgba(212, 28, 242, 0.2) 99.61%
    );
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.grayScale.gray3};
    border-radius: 10px;
    padding: 10px;
  }
  @media (max-width: 650px) {
    margin-bottom: 10px;
    width: 100%;
    max-width: none;
    flex-grow: 1;
  }
`;

export const MultiLevelMenuFirsLevelHeaderContent = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

export const MultiLevelMenuArrowRight45 = styled(ArrowNarrowRightIcon)<{
  $hidden?: boolean;
}>`
  transform: rotate(-45deg);
  display: ${({ $hidden }) => ($hidden ? 'none' : 'inline-flex')};
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
  @media (max-width: 650px) {
    display: none;
  }
`;

export const MultiLevelMenuArrowRight = styled(ArrowDownIcon)`
  transform: rotate(-90deg);
  @media (max-width: 650px) {
    display: none;
  }
`;

export const MultiLevelMenuSecondLevelLi = styled.li`
  position: relative;
  list-style: none;
  padding-left: 10px;
  padding-bottom: 18px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.grayScale.gray2};
  &:last-child {
    border-bottom: none;
  }
`;

export const MultiLevelMenuSecondLevelCardLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const MultiLevelMenuSecondLevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-right: 6px;
  padding-top: 18px;
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
