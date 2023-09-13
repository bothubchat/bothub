import styled from 'styled-components';

export const HeaderAuthUserItemStyled = styled.a`
  display: inline-flex;
  width: 100%;
  padding: 8px 16px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.base.white};
  line-height: 18px;
  gap: 10px;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background: ${({ theme }) => theme.colors.grayScale.gray2};
  }
`;
