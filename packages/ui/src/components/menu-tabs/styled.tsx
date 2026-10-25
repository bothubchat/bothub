import { css, styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '../scrollbar';
import { Typography } from '../typography';
import { themeVar } from '@/ui/theme';

export const MenuTabsStyled = styled.div`
  background: inherit;
`;

export const MenuTabsList = styled.div`
  background: inherit;
`;

export const MenuTabsWrapper = styled(Scrollbar).attrs(({ theme }) => ({
  variant: 'secondary',
  isHorizontalScrollbar: true,

  scrollShadows: {
    color: theme.colors.base.black,
    left: <ScrollbarShadow side="left" />,
    right: <ScrollbarShadow side="right" />,
  },
}))`
  background: inherit;
`;

export const MenuTabsContent = styled.div`
  display: flex;
  position: relative;
  gap: 24px;
  background: inherit;
  width: fit-content;
`;
export const MenuTabsText = styled(Typography).attrs({
  variant: 'body-l-medium',
})`
  color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray6')};
`;

export const MenuTabsItem = styled.div<{ $active: boolean }>`
  padding: 8px 10px 16px 10px;
  background: inherit;
  width: fit-content;
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray6')};
  ${({ $active, theme }) =>
    !$active
      ? css`
          &:hover ${MenuTabsText} {
            transition: all 350ms ease;
            color: ${themeVar(theme, 'colors.base.white')};
          }
          &:hover:before {
            content: '';
            transition: all 350ms ease;
            position: absolute;
            height: 4px;
            left: 0px;
            width: 100%;
            background: ${themeVar(theme, 'colors.grayScale.gray6')};
            border-radius: 0px 0px 24px 24px;
            bottom: 0px;
          }
        `
      : css`
          cursor: default;
        `}
`;

export const MenuTabsLine = styled.div`
  position: absolute;
  left: 0px;
  width: 1px;
  transition:
    transform 350ms ease,
    width 350ms ease;
  border-radius: 0px 0px 24px 24px;
  background: ${({ theme }) => themeVar(theme, 'colors.premiumGradient')};
  bottom: 0px;
  height: 4px;
`;
