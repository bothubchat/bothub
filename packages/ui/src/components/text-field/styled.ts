import { css, styled } from 'styled-components';

export const TextFieldStyled = styled.label<{ $fullWidth: boolean }>`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '420px')};
  box-sizing: border-box;
`;

export const TextFieldLabel = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.base.white};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 8px;
  width: 100%;
`;

export interface TextFieldInputContainerProps {
  $error: boolean;
  $focus: boolean;
  $hover: boolean;
}

export const TextFieldInputContainer = styled.span<TextFieldInputContainerProps>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray1};
  border-radius: 8px;
  overflow: hidden;
  cursor: text;
  padding: 0px 16px;
  ${({
    theme, $error, $hover, $focus 
  }) => {
    if ($error) {
      return css`
        border-color: ${theme.colors.critic};
      `;
    }
    return ($hover || $focus) && css`
      border-color: ${theme.colors.accent.primary};
    `;
  }}
  ${({ theme, $focus }) => {
    if ($focus) {
      return css`
        background: ${theme.colors.grayScale.gray2};
      `;
    }

    return css`
      background: ${theme.colors.grayScale.gray5};
    `;
  }}
`;

export const TextFieldInput = styled.input`
  display: inline-flex;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  padding: 14px 0px;
  color: ${({ theme }) => theme.colors.base.white};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  line-height: 18px;
  &:hover ~ ${TextFieldInputContainer} {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray6};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 100px ${({ theme }) => theme.colors.grayScale.gray5} inset !important;
  }
  &:-webkit-autofill:focus {
    box-shadow: 0 0 0 100px ${({ theme }) => theme.colors.grayScale.gray2} inset !important;
  }
`;

export const TextFieldErrorText = styled.span`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 16px;
  line-height: 22px;
`;
