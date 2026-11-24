import React from 'react';
import { css, keyframes, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { ArrowUpLineIcon } from '@/ui/icons/arrow-up-line';
import { colorToRgba } from '@/ui/utils';
import { CloseIcon } from '@/ui/icons/close';
import { Chip } from '@/ui/components/chip';
import { PauseIcon } from '@/ui/icons/pause';
import { PlayIcon } from '@/ui/icons/play';
import { ExclamationIcon } from '@/ui/icons/exclamation';
import { Typography } from '@/ui/components/typography';
import { themeVar } from '@/ui/theme';

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
  gap: 10px;
  position: relative;
  border-radius: 18px;
  border: 1px solid
    ${({ theme, $active, $disabled }) => {
      if ($disabled) {
        return themeVar(theme, 'colors.grayScale.gray2');
      }
      return $active
        ? themeVar(theme, 'colors.accent.primary')
        : themeVar(theme, 'colors.grayScale.gray2');
    }};
  background: ${({ theme, $disabled }) => {
    if ($disabled) {
      return themeVar(theme, 'colors.grayScale.gray3');
    }

    return themeVar(theme, 'tokens.surfaceRaised');
  }};
  box-shadow: 0 10px 30px
    ${({ theme }) =>
      colorToRgba(theme.default.colors.base.black, theme.bright ? 0.08 : 0.25)};
  width: 100%;
  padding: 12px 12px 10px;
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
        border-color: ${({ theme }) =>
          themeVar(theme, 'colors.accent.primary')};
      }
    `}
  ${({ $dragActive }) =>
    $dragActive &&
    `
    opacity: 0.85;
  `}
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 10px 10px 8px;
  }
`;

export const InputMessageContent = styled.div`
  width: 100%;
  gap: 10px;
  display: grid;
  grid-template-areas: 'input input input' 'configure . buttons';
  grid-auto-rows: min-content;
  /* Кнопки слева сжимаются, если места мало: отправка всегда на виду */
  grid-template-columns: minmax(0, max-content) 1fr max-content;
  align-items: center;
`;

export const InputMessageConfigure = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  min-width: 0;
  max-width: 100%;
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

// Круглые кнопки поля — свои, не Button: он красит пути иконок заливкой, а
// иконки здесь контурные
const roundButton = css`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  border-radius: 50%;
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => themeVar(theme, 'tokens.borderFocus')};
    outline-offset: 2px;
  }

  svg {
    pointer-events: none;
  }
`;

export const InputMessageUploadFileLabel = styled.button.attrs({
  type: 'button',
})<InputMessageUploadFileLabelProps>`
  ${roundButton}
  width: 34px;
  height: 34px;
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  background: none;
  color: ${({ theme }) => themeVar(theme, 'tokens.textDefault')};
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: default;
      opacity: 0.5;
    `}

  &:hover {
    background: ${({ theme, $disabled }) =>
      $disabled ? 'none' : themeVar(theme, 'tokens.hoverOverlay')};
  }
`;

export const InputMessageActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  min-width: 0;
`;

/** Над полем: кадры видео, референсы и другое, что относится к сообщению */
export const InputMessageHeader = styled.div`
  width: 100%;
  cursor: default;
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
        <ExclamationIcon fill={themeVar(theme, 'colors.accent.primaryLight')} />
        {children}
      </>
    ),
  }),
)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => themeVar(theme, 'colors.accent.primaryLight')};
`;

// Пустой остаётся в дереве доступности, но не занимает места и не добавляет gap
export const InputMessageStatus = styled.div`
  &:empty {
    position: absolute;
  }
`;

export const InputMessageVoiceFileDelete = styled(Button).attrs({
  variant: 'text',
  children: <CloseIcon />,
  disableHoverColor: true,
})`
  &:hover {
    svg path {
      fill: ${({ theme }) => themeVar(theme, 'colors.accent.primary')};
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
  min-height: 48px;
  max-height: 270px;
  /* The browser sizes the field to its text: use-input does not measure it,
     and the inline height it sets for other browsers does not apply. */
  @supports (field-sizing: content) {
    field-sizing: content;
    height: auto !important;
  }
  background: none;
  outline: none;
  resize: none;
  border: none;
  color: ${({ theme, $disabled }) => {
    if ($disabled) {
      return themeVar(theme, 'colors.grayScale.gray1');
    }

    return themeVar(theme, 'colors.base.white');
  }};
  flex-shrink: 0;
  overflow: auto;
  scrollbar-width: none;
  padding: 0px;
  &::placeholder {
    color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
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
  font-size: 15px;
  line-height: 22px;
  padding: 2px 4px;
  box-sizing: border-box;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    font-size: 16px;
  }
`;

export const InputMessageSendButton = styled.button.attrs({
  type: 'button',
})`
  ${roundButton}
  width: 36px;
  height: 36px;
  border: none;
  background: ${({ theme }) =>
    themeVar(theme, 'tokens.buttonPrimaryBackground')};
  color: ${({ theme }) => themeVar(theme, 'tokens.buttonPrimaryText')};

  &:disabled {
    background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
    color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
    cursor: default;
  }

  // Отправка идёт: лоадер на цвете кнопки, серый заблокированной почти не виден
  &[aria-busy='true'] {
    background: ${({ theme }) =>
      themeVar(theme, 'tokens.buttonPrimaryBackground')};
    color: ${({ theme }) => themeVar(theme, 'tokens.buttonPrimaryText')};
  }
`;

/** На месте отправки, пока идёт генерация */
export const InputMessageStopButton = styled(InputMessageSendButton)``;

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

export const InputMessageVoiceButton = styled.button.attrs({
  type: 'button',
})<InputMessageVoiceButtonProps>`
  ${roundButton}
  width: 36px;
  height: 36px;
  border: none;
  background-color: ${({ theme, $isRecording }) =>
    $isRecording ? themeVar(theme, 'colors.critic') : 'transparent'};
  color: ${({ theme, $isRecording }) =>
    $isRecording
      ? themeVar(theme, 'default.colors.base.white')
      : themeVar(theme, 'tokens.textDefault')};
  position: relative;
  z-index: 0;

  &:disabled {
    color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme, $isRecording }) =>
      $isRecording
        ? themeVar(theme, 'colors.critic')
        : themeVar(theme, 'tokens.hoverOverlay')};
  }
  &:before {
    content: '';
    height: 140%;
    width: 140%;
    position: absolute;
    top: -20%;
    left: -20%;
    background-color: ${({ theme }) => themeVar(theme, 'colors.critic')};
    opacity: ${({ $isRecording }) => ($isRecording ? 1 : 0)};
    filter: blur(18px);
    z-index: -1;
    transition: opacity 300ms ease-out;
  }
`;

export const InputMessageSendIcon = ArrowUpLineIcon;

export const InputMessageVoiceRecord = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputMessageVoiceRecordDot = styled.span`
  display: inline-flex;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => themeVar(theme, 'colors.critic')};
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
  color: ${({ theme }) => themeVar(theme, 'colors.accent.primary')};
`;

export const InputMessageContentTextMessage = styled(Typography).attrs({
  variant: 'body-m-regular',
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => themeVar(theme, 'tokens.inkLight')};
`;

export const InputMessageContentTextFiles = styled(
  InputMessageContentTextMessage,
)`
  color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
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
