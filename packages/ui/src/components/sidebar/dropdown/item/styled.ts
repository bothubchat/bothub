import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const SidebarDropdownItemStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: none;
  outline: none;
  width: 100%;
  align-items: center;
  border: none;
  gap: 10px;
  cursor: pointer;

  padding: 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.base.white};
  &:hover {
    background: ${({ theme }) => theme.colors.grayScale.gray3};
  }
`;

export const SidebarDropdownItemText = styled(Typography).attrs({
  variant: 'body-m-regular',
})``;
