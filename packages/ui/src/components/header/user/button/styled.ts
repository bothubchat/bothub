import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';

export const ButtonStyled = styled(Button)`
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    margin: 0 36px;
  }
`;
