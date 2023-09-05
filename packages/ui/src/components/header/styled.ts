import { styled } from 'styled-components';
import { Container } from '../container';

export const HeaderStyled = styled.header`
  position: sticky;
  background: rgba(18, 24, 37, 0.40);
  backdrop-filter: blur(9px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  padding: 25.5px;
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
`;

export const HeaderLogoLink = styled.a`
  display: inline-flex;
`;

export const HeaderUser = styled.div`
  display: flex;
  align-items: center;
`;
