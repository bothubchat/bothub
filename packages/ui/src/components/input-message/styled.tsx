import { css, keyframes, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { AttachIcon } from '@/ui/icons/attach';
import { SendIcon } from '@/ui/icons/send';
import { Chip } from '@/ui/components/chip';
import { VoiceIcon } from '@/ui/icons/voice';
import { Typography } from '@/ui/components/typography';

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
  border: 1px solid ${({ theme, $active, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray2;
    } 
    return $active ? theme.colors.accent.primary : theme.colors.grayScale.gray2;
  }};
  background: ${({ theme, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray3;
    }

    return theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.grayScale.gray4;
  }};
  width: 100%;
  max-width: ${({ theme }) => theme.dashboard.chat.containerWidth};
  padding: 14px 20px;
  box-sizing: border-box;
  overflow: hidden;
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
  ${({ $disabled }) => !$disabled && css`
    &:hover {
      border-color: ${({ theme }) => theme.colors.accent.primary};
    }
  `}
  ${({ $dragActive }) => $dragActive && `
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

export const InputMessageUploadFileInput = styled.input.attrs({ id: 'inputMessageUploadFileInput' })`
  display: none;
`;

export const InputMessageUploadFileButton = styled(Button).attrs({
  variant: 'secondary', component: 'label', htmlFor: 'inputMessageUploadFileInput', children: <AttachIcon /> 
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
  line-height: 18px;
  color: ${({ theme, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray1;
    }

    return theme.colors.base.white;
  }};
  font-weight: 500;
  font-size: 14px;
  overflow: auto;
  scrollbar-width: none;
  padding: 0px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray1};
  }
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ $disabled }) => $disabled && css`
    cursor: not-allowed;
  `}
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
  animation: ${() => (
    keyframes`
      from {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      to {
        opacity: 1;
      }
    `
  )} 1s ease-in-out infinite;
`;

export const InputMessageVoiceRecordTimeText = styled(Typography).attrs({ variant: 'body-s-medium' })`
  cursor: default;
`;
