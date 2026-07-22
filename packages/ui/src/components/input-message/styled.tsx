import React from 'react';
import { css, keyframes, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { SendIcon } from '@/ui/icons/send';
import { CloseIcon } from '@/ui/icons/close';
import { Chip } from '@/ui/components/chip';
import { VoiceIcon } from '@/ui/icons/voice';
import { PauseIcon } from '@/ui/icons/pause';
import { PlayIcon } from '@/ui/icons/play';
import { ExclamationIcon } from '@/ui/icons/exclamation';
import { Typography } from '@/ui/components/typography';
import { isBright } from '@/ui/utils';

export interface InputMessageStyledProps {
  $active: boolean;
  $disabled: boolean;
  $textAreaDisabled: boolean;
  $dragActive?: boolean;
  $voiceRecording: boolean;
}

export const InputMessageStyled = styled.div<InputMessageStyledProps>`
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  border-radius: 10px;
  border: 1px solid
    ${({ theme, $active, $disabled }) => {
      if ($disabled) {
        return theme.colors.grayScale.gray2;
      }
      return $active
        ? theme.colors.accent.primary
        : theme.colors.grayScale.gray2;
    }};
  background: ${({ theme, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray3;
    }

    return theme.mode === 'light'
      ? theme.default.colors.base.white
      : theme.colors.grayScale.gray4;
  }};
  width: 100%;
  padding: 14px 20px;
  max-width: ${({ theme }) => theme.dashboard.chat.containerWidth};
  box-sizing: border-box;
  overflow: visible;
  cursor: ${({ $disabled, $textAreaDisabled, $voiceRecording }) => {
    if ($disabled) {
      return 'not-allowed';
    }
    if ($textAreaDisabled || $voiceRecording) {
      return 'default';
    }

    return 'text';
  }};
  outline: none;
  ${({ $disabled }) =>
    !$disabled &&
    css`
      &:hover {
        border-color: ${({ theme }) => theme.colors.accent.primary};
      }
    `}
  ${({ $dragActive }) =>
    $dragActive &&
    `
    opacity: 0.85;
  `}
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 12px 12px;
  }
`;

export const InputMessageContent = styled.div`
  width: 100%;
  gap: 14px;
  display: grid;
  grid-template-areas: 'input input input' 'configure . buttons';
  grid-auto-rows: min-content;
  grid-auto-columns: min-content auto min-content;
  align-items: center;
`;

export const InputMessageConfigure = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  width: fit-content;
  height: 100%;
  user-select: none;
  grid-area: configure;
`;

export interface InputMessageMenuOptionProps {
  icon?: React.ReactNode;
  children?: string | React.ReactNode;
}

export const InputMessageUploadFile = styled.div`
  display: inline-flex;
`;

export const InputMessageUploadFileInput = styled.input`
  display: none;
`;

export interface InputMessageUploadFileLabelProps {
  $disabled?: boolean;
}

export const InputMessageUploadFileLabel = styled(
  Button,
).attrs<InputMessageUploadFileLabelProps>({
  variant: 'secondary',
})`
  border: none !important;
  display: inline-flex;
  width: auto;
  cursor: pointer;
  outline: none !important;
  border-radius: 50% !important;
  box-shadow: none !important;
  aspect-ratio: 1/1;
`;

export const InputMessageActions = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const InputMessageMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
  grid-area: input;
`;

export const InputMessageButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  grid-area: buttons;
`;

export const InputMessageFilesStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  cursor: default;
  max-height: 200px;
  overflow-y: auto;
`;

export const InputMessageFile = styled(Chip).attrs({ variant: 'input' })``;

export const InputMessageVoiceFiles = styled(InputMessageFilesStyled)`
  width: 100%;
`;

export const InputMessageVoiceTrack = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

export const InputMessageConcatenateWarning = styled(Typography).attrs(
  ({ theme, children }) => ({
    variant: 'body-m-regular',
    children: (
      <>
        <ExclamationIcon fill={theme.colors.accent.primaryLight} />
        {children}
      </>
    ),
  }),
)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.accent.primaryLight};
`;

export const InputMessageVoiceFileDelete = styled(Button).attrs({
  variant: 'text',
  children: <CloseIcon />,
  disableHoverColor: true,
})`
  &:hover {
    svg path {
      fill: ${({ theme }) => theme.colors.accent.primary};
    }
  }
`;

export interface InputMessageTextAreaProps {
  $disabled: boolean;
}

export const InputMessageTextArea = styled.textarea<InputMessageTextAreaProps>`
  display: flex;
  height: auto;
  width: 100%;
  min-height: 22px;
  max-height: 270px;
  background: none;
  outline: none;
  resize: none;
  border: none;
  color: ${({ theme, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray1;
    }

    return theme.colors.base.white;
  }};
  flex-shrink: 0;
  overflow: auto;
  scrollbar-width: none;
  padding: 0px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray1};
  }
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}

  font-weight: 400;
  font-size: 18px;
  line-height: 23.4px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const InputMessageSendButton = styled(Button)`
  flex-shrink: 0;
  svg {
    pointer-events: none;
  }
`;

export const InputMessageVoicePauseButton = styled(Button).attrs({
  variant: 'text',
  children: <PauseIcon />,
})`
  padding: 10px;
  margin-left: 10px;
`;

export const InputMessageVoicePlayButton = styled(
  InputMessageVoicePauseButton,
).attrs({
  children: <PlayIcon />,
})``;

export interface InputMessageVoiceButtonProps {
  $isRecording?: boolean;
  disabled?: boolean;
}

export const InputMessageVoiceButton = styled(
  InputMessageSendButton,
).attrs<InputMessageVoiceButtonProps>(({ theme, disabled }) => ({
  variant: 'text',
  startIcon: <VoiceIcon />,
  iconFill: disabled
    ? theme.colors.grayScale.gray1
    : isBright(theme.colors.grayScale.gray4)
      ? theme.default.colors.base.black
      : theme.default.colors.base.white,
  disableHoverColor: true,
}))`
  margin-inline: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ theme, $isRecording }) =>
    $isRecording ? theme.colors.critic : 'transparent'};
  position: relative;
  z-index: 0;
  ${({ theme, $isRecording }) =>
    $isRecording &&
    css`
      svg path {
        fill: ${theme.default.colors.base.white} !important;
      }
    `}
  &:before {
    content: '';
    height: 140%;
    width: 140%;
    position: absolute;
    top: -20%;
    left: -20%;
    background-color: ${({ theme }) => theme.colors.critic};
    opacity: ${({ $isRecording }) => ($isRecording ? 1 : 0)};
    filter: blur(18px);
    z-index: -1;
    transition: opacity 300ms ease-out;
  }
`;

export const InputMessageSendIcon = SendIcon;

export const InputMessageVoiceRecord = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputMessageVoiceRecordDot = styled.span`
  display: inline-flex;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.critic};
  border-radius: 50%;
  animation: ${() => keyframes`
      from {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      to {
        opacity: 1;
      }
    `}
    1s ease-in-out infinite;
`;

export const InputMessageVoiceRecordTimeText = styled(Typography).attrs({
  variant: 'body-s-medium',
})`
  cursor: default;
`;

export const InputMessageEditWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  align-items: center;
`;

export const InputMessageContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const InputMessageContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 0;
  min-width: 0;
  overflow: hidden;
`;

export const InputMessageContentTextWrapper = styled.div`
  display: flex;
  overflow: hidden;
  min-width: 0;
`;

export const InputMessageContentActionText = styled(Typography).attrs({
  variant: 'body-l-regular',
})`
  color: ${({ theme }) => theme.colors.accent.primary};
`;

export const InputMessageContentTextMessage = styled(Typography).attrs({
  variant: 'body-m-regular',
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.base.white : theme.colors.base.black};
`;

export const InputMessageContentTextFiles = styled(
  InputMessageContentTextMessage,
)`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const InputMessageCloseEditButton = styled.button`
  margin: 0;
  cursor: pointer;
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputMessageFilesMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputMessageFilesTriggerButton = styled(Button)`
  transform: none !important;
`;
