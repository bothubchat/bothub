import { css, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { AttachIcon } from '@/ui/icons/attach';
import { SendIcon } from '@/ui/icons/send';
import { Chip } from '@/ui/components/chip';

export interface InputMessageStyledProps {
  $active: boolean;
  $disabled: boolean;
  $textAreaDisabled: boolean;
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
  cursor: ${({ $disabled, $textAreaDisabled }) => {
    if ($disabled) {
      return 'not-allowed';
    }
    if ($textAreaDisabled) {
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
`;

export const InputMessageContent = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
`;

export const InputMessageUploadFile = styled.label`
  display: inline-flex;
`;

export const InputMessageUploadFileInput = styled.input`
  display: none;
`;

export const InputMessageUploadFileButton = styled(Button).attrs({ variant: 'secondary', component: 'span', children: <AttachIcon /> })`
  flex-shrink: 0;
`;

export const InputMessageMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
`;

export const InputMessageFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  cursor: default;
`;

export const InputMessageFile = styled(Chip)``;

export interface InputMessageTextAreaProps {
  $disabled: boolean;
}

export const InputMessageTextArea = styled.textarea<InputMessageTextAreaProps>`
  display: flex;
  white-space: nowrap;
  height: 18px;
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
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
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

export const InputMessageSendButton = styled(Button).attrs({ children: <SendIcon /> })`
  flex-shrink: 0;
`;
