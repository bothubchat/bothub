import { styled, css } from 'styled-components';

export const BadgeSelectDropdownListItemStyled = styled.li<{
  $active: boolean;
}>`
  list-style: none;
  white-space: nowrap;
  padding: 10px;
  border-radius: 8px;

  ${({ theme, $active }) => css`
    background: ${$active && theme.colors.grayScale.gray2};
  `}
  &:hover {
    cursor: pointer;
  }
`;
