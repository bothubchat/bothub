import { css, styled } from 'styled-components';
import { SidebarChatIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';
import { colorToRgba } from '@/ui/utils';
import { Button } from '../../button';

export const SidebarChatStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SidebarChatBox = styled.div<{
  $active?: boolean;
}>`
  position: relative;
  cursor: pointer;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  padding: 8px;
  min-height: 38px;
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

  ${({ $active }) =>
    $active &&
    css`
      background: ${({ theme }) =>
        colorToRgba(theme.colors.accent.primaryLight, 0.5)};
    `}
`;

export const SidebarChatPromtLine = styled.div<{
  percent: number;
}>`
  position: relative;
  height: 3px;
  width: 100%;
  margin-top: 8px;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  &::before {
    content: '';
    position: absolute;
    border-radius: 8px;
    top: 0;
    height: 3px;
    left: 0px;
    width: ${({ percent }) => percent}%;
    height: 100%;
    transition: all 0.15s ease-in-out;
    background: ${({ theme }) => theme.colors.premiumGradient};
  }
`;

export const SidebarChatName = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'p',
})<{
  $skeleton?: boolean;
}>`
  ${({ $skeleton }) =>
    $skeleton ? 'display: flex; align-items: center;' : 'display: block;'}
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;
  text-overflow: ellipsis;
`;

export const SidebarChatIconStyled = styled(SidebarChatIcon)``;

export const SidebarChatIconSkeleton = styled(Skeleton)`
  aspect-ratio: 1/1;
  display: flex;
  width: 20px;
  height: 20px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    width: 18px;
    height: 18px;
  }
`;

export const SidebarChatSkeleton = styled(Skeleton)`
  margin-left: 8px;
`;

export const SidebarChatButton = styled.button<{
  $active?: boolean;
}>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-grow: 1;
  max-height: 42px;
  user-select: all;
  background: none;
  outline: none;
  padding: 0;
  border: none;
  aspect-ratio: 1/1;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  ${({ $active, theme }) =>
    $active &&
    `background: ${colorToRgba(theme.colors.accent.primaryLight, 0.5)} `}
`;

export const SidebarChatDraggbleButton = styled(Button).attrs({
  variant: 'text',
})`
  z-index: 1;
  cursor: grab;
`;

export const SidebarChatLoadingText = styled(Typography).attrs({
  variant: 'body-s-medium',
  component: 'p',
})``;
