import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const MessageVideoControls = styled.div<{ $isVisible?: boolean }>`
  transform: ${({ $isVisible }) =>
    $isVisible ? 'translateY(0)' : 'translateY(100%)'};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 300ms ease-out;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  padding-top: 16px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  width: 100%;
`;

export const MessageVideoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: inherit;
  &:hover {
    ${MessageVideoControls} {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MessageVideoStyled = styled.video<{ $isFullScreen?: boolean }>`
  max-width: ${({ $isFullScreen }) => ($isFullScreen ? '100%' : '600px')};
  width: 100%;
`;

export const MessageVideoControlsButton = styled.button`
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  svg path {
    stroke: white;
  }
`;

export const MessageVideoControlsButtons = styled.div<{
  $isFullScreen?: boolean;
}>`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 8px;
  align-items: center;
`;

export const MessageVideoTimeLine = styled.div<{ $progress: number }>`
  position: relative;
  height: 4px;
  border-radius: 4px;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: ${({ $progress }) => $progress}%;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const MessageVideoTimeText = styled(Typography).attrs({
  variant: 'body-s-medium'
})``;

export const MessageVideoVolumeLine = styled.div<{ $volume: number }>`
  position: relative;
  height: 4px;
  transition: all 300ms ease-out;
  border-radius: 4px;
  width: 0;
  max-width: 100px;
  opacity: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  cursor: pointer;
  align-items: center;
  &:after {
    content: '';
    position: absolute;
    cursor: pointer;
    bottom: 0;
    left: 0;
    border-radius: 4px;
    height: 4px;
    width: ${({ $volume }) => $volume}%;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.default.colors.base.white};
  }
  &:before {
    content: '';
    position: absolute;
    left: ${({ $volume }) => $volume}%;
    width: 12px;
    z-index: 1;
    margin-left: -8px;
    cursor: pointer;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 1);
  }
`;

export const MessageVideoVolumeContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  overflow: hidden;
  gap: 8px;
  &:hover {
    padding-right: 8px;
    ${MessageVideoVolumeLine} {
      width: 75px;
      opacity: 1;
    }
  }
`;
