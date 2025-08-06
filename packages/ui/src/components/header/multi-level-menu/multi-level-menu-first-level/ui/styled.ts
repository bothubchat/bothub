import { styled } from 'styled-components';
import { ArrowDownIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';

export const MultiLevelFirstLevelMenuLi = styled.li<{
  $gotChild: boolean;
}>`
  display: flex;
  list-style: none;
  align-items: start;
  transition: all 0.5s ease-in;
  &:hover {
    width: ${({ $gotChild }) => $gotChild && 'auto'};
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export const MultiLevelMenuFirstLevelTitle = styled(Typography).attrs({
  variant: 'body-m-medium',
})``;

export const MultiLevelMenuFirstLevelHeader = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 250px;
  width: 250px;
  border: 1px solid;
  border-color: transparent;
  padding: 10px;
  cursor: pointer;
  flex-shrink: 0;
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

export const MultiLevelMenuFirstLevelHeaderContent = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

export const MultiLevelMenuArrowRight = styled(ArrowDownIcon)`
  transform: rotate(-90deg);
  @media (max-width: 650px) {
    display: none;
  }
`;
