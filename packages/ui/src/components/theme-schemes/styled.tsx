import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { Plus2Icon } from '@/ui/icons/plus-2';

export const ThemeSchemesStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;

  ${adaptive({
    variant: 'dashboard',
    tablet: css`
      flex-direction: row;
    `
  })}
`;

export const ThemeAddButton = styled.button.attrs({
  children: <Plus2Icon />
})`
  all: unset;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 13px;
  border-radius: 26px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  &:hover {
    cursor: pointer;
    outline: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  }
  &:active {
    transform: scale(0.96);
  }
  svg path {
    fill: ${({ theme }) => theme.colors.accent.primary};
  }
  transition: scale 50ms ease-out;
`;
