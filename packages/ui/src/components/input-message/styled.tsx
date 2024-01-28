import { css, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { SendIcon } from '@/ui/icons';

export interface InputMessageStyledProps {
  $active: boolean;
  $disabled: boolean;
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
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'text')};
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

export interface InputMessageContentEditableProps {
  $placeholder: boolean;
}

export const InputMessageContentEditable = styled.div<InputMessageContentEditableProps>`
  width: 100%;
  white-space: break-spaces;
  max-height: 270px;
  background: none;
  outline: none;
  resize: none;
  border: none;
  line-height: 18px;
  color: ${({ theme, $placeholder }) => ($placeholder ? theme.colors.grayScale.gray1 : theme.colors.base.white)};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ $placeholder }) => $placeholder && css`
    user-select: none;
    pointer-events: none;
  `}
`;

export const InputMessageSendButton = styled(Button).attrs({ children: <SendIcon /> })`
  flex-shrink: 0;
`;
