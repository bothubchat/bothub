import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons';
import { colorToRgba } from '@/ui/utils';

export const SidebarGroupStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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

export const SidebarGroupList = styled(animated.div)`
  transform-origin: top center;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SidebarGroupName = styled(Typography).attrs({
  variant: 'body-l-medium',
  component: 'p'
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const SidebarGroupsList = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 8px;
`;

export const SidebarArrowDownIcon = styled(ArrowDownIcon)<{
  $isOpen: boolean;
}>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.2s linear;
`;

export const SidebarGroupButton = styled.button`
  display: flex;
  background: none;
  outline: none;
  padding: 0;
  border: none;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
