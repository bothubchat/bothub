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
  position: relative;
  user-select: none;
  row-gap: 8px;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
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
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    margin-bottom: ${({ $active }) => $active && '10px'};
  }
`;

export const MultiLevelMenuLi = styled.li`
  list-style: none;
`;

export const MultiLevelMenuTitle = styled(Typography).attrs({
  variant: 'body-l-semibold'
})``;

export const MultiLevelMenuArrowDownIcon = styled(ArrowDownIcon)<{
  $open: boolean;
}>`
  transition: transform 0.2s ease-in-out;
  transform: ${({ $open }) => $open && 'rotate(180deg)'};
`;
