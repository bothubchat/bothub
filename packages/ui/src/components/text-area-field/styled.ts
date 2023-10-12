import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export interface TextAreaFieldStyledProps {
  $fullWidth: boolean;
}

export const TextAreaFieldStyled = styled.label<TextAreaFieldStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  ${({ $fullWidth }) => !$fullWidth && css`
    max-width: 263px;
  `}
`;

export const TextAreaFieldLabel = styled(Typography).attrs({ variant: 'input-sm' })`
  margin-bottom: 8px;
  cursor: default;
`;

export interface TextAreaFieldBlockProps {
  $focus: boolean;
  $error: boolean;
}

export const TextAreaFieldBlock = styled.div<TextAreaFieldBlockProps>`
  display: flex;
  width: 100%;
  height: 165px;
  overflow: hidden;
  border: 1px solid ${({ theme, $error, $focus }) => {
    if ($error) {
      return theme.colors.critic;
    } 
    if ($focus) {
      return theme.colors.accent.primary; 
    }
    return theme.colors.grayScale.gray2;
  }};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  ${({ theme, $error }) => !$error && css`
    &:hover {
      border-color: ${theme.colors.accent.primary};
    }
  `}
`;

export const TextAreaFieldTextArea = styled.textarea`
  display: flex;
  width: 100%;
  height: inherit;
  box-sizing: border-box;
  resize: none;
  outline: none;
  background: none;
  border: none;
  padding: 14px 16px;
  color: ${({ theme }) => theme.colors.base.white};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 14px;
  line-height: 18px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray1};
  }
  &:focus::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray6};
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TextAreaFieldErrorText = styled(Typography).attrs({ variant: 'input-sm' })`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
`;
