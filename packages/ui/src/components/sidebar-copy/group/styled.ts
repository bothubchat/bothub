import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons';

export const SidebarGroupStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SidebarGroupBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  height: fit-content;
  position: relative;
  z-index: 0;
  &::before, &::after {
    z-index: -1;
    content: '';
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    transition: all 0.15s ease-in-out;
  }
  &:hover {
    &::before {
      opacity: 0.5;
      background: ${({ theme }) => theme.colors.accent.primaryLight};
    }
    &::after {
      border-left: 3px solid ${({ theme }) => theme.colors.accent.primary};
    }
  }
`;

export const SidebarGroupList = styled(animated.div)`
  transform-origin: top center;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
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

export const SidebarGroupsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SidebarArrowDownIcon = styled(ArrowDownIcon)<{
  $isOpen: boolean;
}>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.2s linear;
`;