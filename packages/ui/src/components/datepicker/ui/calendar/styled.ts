import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { Typography } from '@/ui/components/typography';
import { ArrowNarrowLeftIcon } from '@/ui/icons/arrow-narrow-left';

export const Wrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  width: 284px;
  background-color: ${(props) => props.theme.colors.grayScale.gray3};
  z-index: ${({ theme }) => theme.zIndex.select};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChangeMonthButton = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.2s ease-out;
  &:hover {
    opacity: 0.6;
  }
`;
export const PrevMonth = styled(ChangeMonthButton)``;
export const NextMonth = styled(ChangeMonthButton)``;

export const PreArrowIcon = styled(ArrowNarrowLeftIcon)``;
export const NextArrowIcon = styled(PreArrowIcon)`
  transform: rotate(180deg);
`;

export const Title = styled(Typography)``;

export const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DateGridItem = styled.div`
  width: 36px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const DayOfMonth = styled(Typography)``;

export const DateGridInteractiveItem = styled(DateGridItem).attrs({
  as: 'button',
})<{
  $active?: boolean;
  $outRange?: boolean;
  $today?: boolean;
  $isBetweenSelected: boolean;
  $startDate?: boolean;
  $finishDate?: boolean;
}>`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  transition: 0.2s ease-out;
  &:hover {
    background-color: ${(props) => props.theme.colors.grayScale.gray2};
  }
  ${(props) =>
    props.$active &&
    `
    border-radius: 8px;
    background-color: ${props.theme.colors.accent.primary};
    &:hover {
      background-color: ${props.theme.colors.accent.primaryLight};
    }
  `}
  ${(props) =>
    props.$outRange &&
    `
    ${DayOfMonth} {
      color: ${props.$active ? props.theme.colors.grayScale.gray2 : props.theme.colors.grayScale.gray1};
    }
  `}
  ${(props) =>
    props.$startDate &&
    `
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `}
  ${(props) =>
    props.$finishDate &&
    `
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `}
  ${(props) =>
    props.$isBetweenSelected &&
    `
    border-radius: 0;
    background-color: ${props.theme.colors.grayScale.gray2};
  `}
`;

export const DayOfWeek = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale.gray1};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const SaveButton = styled(Button)`
  flex: 1;
`;

export const CancelButton = styled(Button)`
  flex: 1;
`;
