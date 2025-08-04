import { styled } from 'styled-components';
import { Typography } from '../typography';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  gap: 16px;
  padding-bottom: 1px;
`;

export const FormText = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'p',
})`
  color: ${({ theme }) => theme.default.colors.grayScale.gray1};
  width: 100%;
  margin-bottom: 10px;
`;

export const FormButtons = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;
