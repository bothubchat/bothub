import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons';
import { colorToRgba } from '@/ui/utils';
import { Skeleton } from '@/ui/components/skeleton';

export const SidebarGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  user-select: none;
`;

export const SidebarGroupBackground = styled.div``;

export const SidebarGroupBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  height: fit-content;
  position: relative;
  transition: all 0.15s ease-in-out;
  border-radius: 8px;
  &::before {
    content: '';
    position: absolute;
    border-radius: 8px;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    transition: all 0.15s ease-in-out;
  }
  &:hover {
    background: ${({ theme }) =>
      colorToRgba(theme.colors.accent.primaryLight, 0.5)};
    &::before {
      border-left: 3px solid ${({ theme }) => theme.colors.accent.primary};
    }
  }
`;

export const SidebarGroupList = styled(animated.div)<{
  $isSidebarOpen?: boolean;
}>`
  transform-origin: top center;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '4px' : '8px')};
`;

export const SidebarGroupName = styled(Typography).attrs({
  variant: 'body-l-medium',
  component: 'p',
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const SidebarGroupsList = styled.div<{
  $isSidebarOpen?: boolean;
}>`
  display: flex;
  flex-direction: column;
  ${({ $isSidebarOpen }) => $isSidebarOpen && 'padding-right: 8px;'}
  gap: 8px;
`;

export const SidebarArrowDownIcon = styled(ArrowDownIcon)<{
  $isOpen: boolean;
}>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.1 s linear;
`;

export const SidebarGroupButton = styled.button`
  display: flex;
  background: none;
  outline: none;
  flex-grow: 1;
  padding: 0;
  border: none;
  max-height: 42px;
  aspect-ratio: 1/1;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SidebarGroupSkeletonStyled = styled(Skeleton)``;

export const SidebarGroupIconSkeleton = styled(Skeleton)`
  aspect-ratio: 1/1;
  width: 24px;
  height: 24px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    width: 22px;
    height: 22px;
  }
`;
export const SidebarGroupSkeletonContainer = styled(Typography).attrs({
  component: 'div',
  variant: 'body-l-medium',
})`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  height: fit-content;
`;
