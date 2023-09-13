import styled from 'styled-components';

export const Divider = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
`;
