import { styled } from 'styled-components';
import { ArrowDownIcon, ArrowNarrowRightIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';

export const MultiLevelMenuStyled = styled.nav`
  margin-top: 30px;
  padding: 0 40px;
`;
export const MultiLevelMenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
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
  margin-bottom: ${({ $active }) => $active && '14px'};
`;
export const MultiLevelMenuTitle = styled(Typography).attrs({
  variant: 'body-l-semibold'
})``;

export const MultiLevelMenuLi = styled.li`
  list-style: none;
`;
export const MultiLevelFirstLevelMenuLi = styled.li`
  display: flex;
  list-style: none;
  align-items: start;
`;

export const MultiLevelMenuFirstLevelWrapper = styled.ul<{ $open: boolean }>`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  user-select: none;
  row-gap: 8px;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
`;

export const MultiLevelMenuFirsLevelTitle = styled(Typography).attrs({
  variant: 'body-m-medium'
})``;

export const MultiLevelMenuSecondLevelWrapper = styled.div`
  user-select: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
  display: none;
  padding-left: 18px;
  flex-grow: 1;
  ${MultiLevelFirstLevelMenuLi}:hover & {
    display: flex;
  }
`;

export const MultiLevelMenuFirsLevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 250px;
  width: 250px;
  border: 1px solid;
  border-color: transparent;
  padding: 10px;
  //придумать что-то с маргином должен быть внешним а не внутриним
  cursor: pointer;
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
`;

export const MultiLevelMenuFirsLevelHeaderContent = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

export const MultiLevelMenuArrowRight45 = styled(ArrowNarrowRightIcon)`
  transform: rotate(-45deg);
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;

export const MultiLevelMenuArrowRight = styled(ArrowDownIcon)`
  transform: rotate(-90deg);
`;

export const MultiLevelMenuSecondLevelLi = styled.li`
  position: relative;
  list-style: none;
  margin-bottom: 8px;
  padding-left: 10px;
  padding-bottom: 8px;
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
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const MultiLevelMenuSecondLevelHeaderContent = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

export const MultiLevelMenuSecondLevelDescription = styled(Typography).attrs({
  variant: 'body-m-regular'
})``;
