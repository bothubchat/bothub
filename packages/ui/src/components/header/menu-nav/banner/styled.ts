import { styled } from 'styled-components';

export const BannerStyled = styled.div`
  display: flex;
  width: 406px;
  height: 100%;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  color: #fff;
  padding: 16px;
`;
