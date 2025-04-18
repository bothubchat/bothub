import { SidebarChatIcon } from "@/ui/icons";
import { styled } from "styled-components";
import { Typography } from "@/ui/components/typography";
import { Skeleton } from "@/ui/components/skeleton";

export const SidebarChatStyled = styled.div`
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

export const SidebarChatName = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'p'
})`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SidebarChatIconStyled = styled(SidebarChatIcon)``;

export const SidebarChatIconSkeleton = styled(Skeleton)`
  aspect-ratio: 1/1;
  width: 22px;
  height: 22px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    width: 18px;
    height: 18px;
  }
`;

export const SidebarChatSkeleton = styled(Skeleton)`
  width: 70%;
`;