import { css, styled } from 'styled-components';
import { ArrowDownIcon, LanguageIcon } from '@/components/icons';
import { Typography } from '@/components/typography';

export const HeaderLangDropdownStyled = styled.div``;

export const HeaderLangDropdownTogglerIcon = styled(LanguageIcon).attrs({ size: 18 })`
  pointer-events: none;
`;

export const HeaderLangDropdownTogglerText = styled(Typography)`
  text-transform: uppercase;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
  line-height: 22px;
  pointer-events: none;
`;

export const HeaderLangDropdownTogglerArrow = styled(ArrowDownIcon).attrs({ size: 16 })`
  pointer-events: none;
`;

export const HeaderLangDropdownToggler = styled.button<{ $open: boolean }>`
  display: inline-flex;
  background: none;
  border: none;
  outline: none;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  &:hover {
    > ${HeaderLangDropdownTogglerIcon} > path {
      fill: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${HeaderLangDropdownTogglerText} {
      color: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${HeaderLangDropdownTogglerArrow} > path {
      stroke: ${({ theme }) => theme.colors.accent.primary};
    }
  }
  ${({ $open }) => $open && css`
    > ${HeaderLangDropdownTogglerIcon} > path {
      fill: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${HeaderLangDropdownTogglerText} {
      color: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${HeaderLangDropdownTogglerArrow} > path {
      stroke: ${({ theme }) => theme.colors.accent.primary};
    }
  `}
`;

export const HeaderLangDropdownContent = styled.div`
  display: flex;
  position: fixed;
`;

export const HeaderLangDropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 8px;
  overflow: hidden;
  list-style: none;
  padding: 0px;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  width: 80px;
  padding: 10px 16px;
  box-sizing: border-box;
`;

export const HeaderLangDropdownItem = styled.li`
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
