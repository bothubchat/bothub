import { styled } from 'styled-components';
import { PlayButtonIcon } from '@/ui/icons/play-button';
import { PauseButtonIcon } from '@/ui/icons/pause-button';
import { Button } from '@/ui/components/button';
import { Typography } from '@/ui/components/typography';
import { TextReadIcon } from '@/ui/icons/text-read';
import { TextHideIcon } from '@/ui/icons/text-hide';

export const MessageVoiceStyled = styled.div`
  display: inline-flex;
  width: min-content;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 1px 0px;
`;

export const MessageVoiceAudio = styled.audio`
  display: none;
`;

export interface MessageVoiceMainProps {
  $loading: boolean;
}

export const MessageVoiceMain = styled.div<MessageVoiceMainProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  cursor: ${({ $loading }) => ($loading ? 'progress' : 'pointer')};
`;

export const MessageVoiceToggleButton = styled(Button).attrs({ variant: 'text', iconSize: 36, disableHoverColor: true })`
  cursor: inherit;
`;

export const MessageVoicePlayIcon = styled(PlayButtonIcon)``;

export const MessageVoicePauseIcon = styled(PauseButtonIcon)``;

export const MessageVoiceWaves = styled.svg`
  display: flex;
  flex-shrink: 0;
  width: 145px;
  height: 36px;
`;

export const MessageVoiceDurationText = styled(Typography).attrs({ variant: 'body-s-medium' })`
  color: ${({ theme }) => theme.default.colors.base.white};
  user-select: none;
`;

export const MessageVoiceToggleTextButton = styled(Button).attrs({ variant: 'text', iconSize: 30, disableHoverColor: true })``;

export const MessageVoiceShowTextIcon = styled(TextReadIcon)``;

export const MessageVoiceHideTextIcon = styled(TextHideIcon)``;

export const MessageVoiceText = styled(Typography).attrs({ variant: 'body-m-regular' })`
  width: 100%;
  color: ${({ theme }) => theme.default.colors.base.white};
  &::selection {
    background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)};
    color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.accent.primary)};
  }
`;
