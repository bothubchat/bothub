import { Button } from '@/ui/components/button';
import { styled } from 'styled-components';

export const SidebarDropdownItemStyled = styled(Button).attrs({ variant: 'text', iconSize: 18 })`
  display: inline-flex;
  width: 100%;
  justify-content: flex-start;
  line-height: 22px;
  padding: 6px 0px;
  color: ${({ theme }) => theme.colors.base.white};
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.grayScale.gray3};
    color: ${({ theme }) => theme.colors.base.white};
  }
`;
