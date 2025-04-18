import { styled } from 'styled-components';
import { Typography } from '../typography';
import { ArrowDownIcon, ArrowNarrowRightIcon } from '@/ui/icons';

export const MultiLevelMenuStyled = styled.nav`
  margin-top: 30px;
  padding: 0 40px;
`;
export const MultiLevelMenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;
export const MultiLevelMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const MultiLevelMenuTitle = styled(Typography).attrs({
  variant: 'body-l-semibold'
})``;

export const MultiLevelMenuFirstLevelWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  row-gap: 8px;
`;

export const MultiLevelMenuFirsLevelTitle = styled(Typography).attrs({
  variant: 'body-m-medium'
})``;

export const MultiLevelMenuFirsLevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  max-width: 250px;
  width: 250px;
  //придумать что-то с маргином должен быть внешним а не внутриним
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

export const MultiLevelMenuLi = styled.li`
  list-style: none;
`;
export const MultiLevelFirstLevelMenuLi = styled(MultiLevelMenuLi)`
  display: flex;
  align-items: start;
  gap: 18px;
`;
export const MultiLevelMenuSecondLevelLi = styled(MultiLevelMenuLi)`
  padding: 10px;
`;

export const MultiLevelMenuSecondLevelWrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 486px;
  max-width: 486px;
`;

export const MultiLevelMenuSecondLevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MultiLevelMenuSecondLevelHeaderContent = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;
