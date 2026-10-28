import { css, styled } from 'styled-components';
import { PlayButtonIcon } from '@/ui/icons/play-button';
import { PauseButtonIcon } from '@/ui/icons/pause-button';
import { Button } from '@/ui/components/button';
import { Typography } from '@/ui/components/typography';
import { TextReadIcon } from '@/ui/icons/text-read';
import { TextHideIcon } from '@/ui/icons/text-hide';
import { themeVar } from '@/ui/theme';

export const MessageVoiceStyled = styled.div`
  display: inline-flex;
  border-radius: 10px 10px 0px 0px;
  padding: 1px 0px;
  width: min-content;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
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

export const MessageVoiceToggleButton = styled(Button).attrs({
  variant: 'text',
  iconSize: 36,
  disableHoverColor: true,
})`
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

export const MessageVoiceDurationText = styled(Typography).attrs<{
  $variant: 'input' | 'message';
}>({
  variant: 'body-s-medium',
})`
  color: ${({ theme, $variant }) => {
    if ($variant === 'input') {
      return themeVar(theme, 'tokens.voiceInputText');
    }

    return themeVar(theme, 'tokens.voiceMessageText');
  }};
  user-select: none;
`;

export const MessageVoiceToggleTextButton = styled(Button).attrs({
  variant: 'text',
  iconSize: 30,
  disableHoverColor: true,
})``;

export const MessageVoiceShowTextIcon = styled(TextReadIcon)``;

export const MessageVoiceHideTextIcon = styled(TextHideIcon)``;

export interface MessageVoiceTextProps {
  $messageColor: string;
}

export const MessageVoiceText = styled(Typography).attrs({
  variant: 'body-m-regular',
})<MessageVoiceTextProps>`
  width: 100%;
  color: ${({ theme }) => themeVar(theme, 'tokens.userMessageText')};
  &::selection {
    ${({ $messageColor }) => {
      switch ($messageColor) {
        case 'default':
          return css`
            background: ${({ theme }) =>
              themeVar(theme, 'tokens.accentContrast')};
            color: ${({ theme }) =>
              themeVar(theme, 'tokens.messageAccentDefault')};
          `;
        case 'green':
          return css`
            background: ${({ theme }) =>
              themeVar(theme, 'default.colors.base.white')};
            color: ${({ theme }) => themeVar(theme, 'colors.gpt3')};
          `;
        case 'purple':
          return css`
            background: ${({ theme }) =>
              themeVar(theme, 'default.colors.base.white')};
            color: ${({ theme }) => themeVar(theme, 'colors.gpt4')};
          `;
        default:
          return css`
            background: ${({ theme }) =>
              themeVar(theme, 'default.colors.base.white')};
            color: ${$messageColor};
          `;
      }
    }}
  }
`;

// Played part of the wave: scaled from the left by --voice-progress (0..1),
// so playback changes only a CSS variable instead of the width.
export const StyledRect = styled.rect`
  transform: scaleX(var(--voice-progress, 0));
  transform-origin: 0 0;
  transition: transform 0.25s ease-out;
`;
