import { styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '../scrollbar';
import { Typography } from '../typography';

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
    right: <ScrollbarShadow side="right" />
  }
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

export const MenuTabsItem = styled.div`
  padding: 8px 10px 16px 10px;
  background: inherit;
  width: fit-content;
  cursor: pointer;
`;

export const MenuTabsText = styled(Typography).attrs({ variant: 'body-l-medium' })`
  color: ${({ theme }) => theme.colors.grayScale.gray6};
`;

export const MenuTabsLine = styled.div`
  position: absolute;
  width: 1px;
  transition: all 350ms ease;
  border-radius: 0px 0px 24px 24px;
  background: ${({ theme }) => theme.colors.premiumGradient};
  bottom: 0px;
  height: 4px;
`;
