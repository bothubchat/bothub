import { css, keyframes, styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Button } from '@/ui/components/button';
import { EnterIcon } from '@/ui/icons/enter';
import { AttachIcon } from '@/ui/icons/attach';
import { SendIcon } from '@/ui/icons/send';
import { Chip } from '@/ui/components/chip';
import { VoiceIcon } from '@/ui/icons/voice';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';

export interface InputMessageStyledProps {
  $active: boolean;
  $disabled: boolean;
  $textAreaDisabled: boolean;
  $dragActive?: boolean;
  $voiceRecording: boolean;
}

export const InputMessageStyled = styled.div<InputMessageStyledProps>`
  display: flex;
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
`;

export const InputMessageContent = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
`;

export const InputMessageUploadFile = styled.div`
  display: inline-flex;
`;

export const InputMessageUploadFileInput = styled.input.attrs({
  id: 'inputMessageUploadFileInput'
})`
  display: none;
`;

export const InputMessageUploadFileButton = styled(Button).attrs({
  variant: 'secondary',
  component: 'label',
  htmlFor: 'inputMessageUploadFileInput',
  children: <AttachIcon />
})`
  flex-shrink: 0;
  user-select: none;
`;

export const InputMessageMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 14px;
  width: 100%;
`;

export const InputMessageFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  cursor: default;
  max-height: 200px;
  overflow-y: auto;
`;

export const InputMessageFile = styled(Chip).attrs({ variant: 'input' })``;

export interface InputMessageTextAreaProps {
  $disabled: boolean;
}

export const InputMessageTextArea = styled.textarea<InputMessageTextAreaProps>`
  display: flex;
  height: auto;
  width: 100%;
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

export const InputMessageSendIcon = SendIcon;

export const InputMessageVoiceIcon = VoiceIcon;

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
  variant: 'body-s-medium'
})`
  cursor: default;
`;

export const InputMessageToggleSendStyled = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  ${adaptive({
    tablet: css`
      display: none;
    `,
    mobile: css`
      display: none;
    `
  })}
`;

export const InputMessageToggleSendButton = styled(Button).attrs({
  variant: 'text',
  startIcon: <EnterIcon />,
  iconSize: 24
})`
  svg {
    g path {
      fill: ${({ theme }) => theme.colors.grayScale.gray3} !important;
    }
  }

  display: flex;
  &:hover {
    svg {
      path {
        fill: ${({ theme }) =>
          theme.mode === 'dark'
            ? theme.colors.grayScale.gray2
            : theme.colors.grayScale.gray1} !important;
      }
    }
  }
`;

export const InputMessageToggleSendModalStyled = styled(animated.div)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: fit-content;
  width: max-content;
  max-width: 60vw;
  padding: 6px;
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  border-radius: 10px;
  border: 1px ${({ theme }) => theme.colors.grayScale.gray2} solid;
  background-color: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.colors.grayScale.gray4
      : theme.default.colors.base.white};
  z-index: 50;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const InputMessageToggleSendModalOption = styled.button<{
  active: boolean;
}>`
  all: unset;
  margin: 0;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme, active }) => {
    if (theme.mode === 'dark') {
      return active
        ? theme.colors.grayScale.gray3
        : theme.colors.grayScale.gray4;
    }
    return active
      ? theme.colors.grayScale.gray3
      : theme.default.colors.base.white;
  }};
  cursor: pointer;
  transition:
    opacity 0.1s ease-in-out,
    transform 0.1s ease-in-out,
    filter 0.1s ease-in-out;
  &:hover {
    filter: ${({ theme }) =>
      theme.mode === 'dark' ? 'brightness(120%)' : 'brightness(80%)'};
    transition: filter 100ms ease-in-out;
  }
  &:active {
    transform: translateY(1px);
  }
`;
