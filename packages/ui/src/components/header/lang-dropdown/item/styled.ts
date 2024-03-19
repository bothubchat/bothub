import { styled } from 'styled-components';

export const HeaderLangDropdownItemStyled = styled.li`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  line-height: 22px;
  padding: 6px 0px;
  color: ${({ theme }) => theme.colors.base.white};
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.accent.primaryLight};
  }
`;
