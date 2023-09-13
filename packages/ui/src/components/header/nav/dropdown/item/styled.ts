import styled from 'styled-components';
import { Typography } from '../../../../typography';

export const HeaderNavDropdownItemStyled = styled.a`
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  padding: 14px;
  border-radius: 8px;
  &:hover {
    background: rgba(255, 255, 255, 0.045);
  }
`;

export const HeaderNavDropdownInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HeaderNavDropdownTitle = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
  font-size: 16px;
  line-height: 22px; 
`;

export const HeaderNavDropdownText = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`;
