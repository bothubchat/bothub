import { styled } from 'styled-components';

export const HeaderLangDropdownItemStyled = styled.li`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  line-height: 22px;
  padding: 6px 0px;
  color: ${({ theme }) => theme.colors.base.white};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.accent.primaryLight};
  }
`;
