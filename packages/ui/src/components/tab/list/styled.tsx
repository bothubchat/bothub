import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';

export const TabsStyled = styled.div`
  display: flex;
  width: 100%;
`;

export const TabDesktopList = styled.div`
  ${adaptive(() => ({
    merge: true,
    desktop: css`
      display: flex;
    `,
    mobile: css`
      display: none;
    `,
  }))}
  gap: 18px;
  flex-wrap: wrap;
`;

export const TabMobileList = styled.div`
  ${adaptive(() => ({
    merge: true,
    desktop: css`
      display: none;
    `,
    mobile: css`
      display: flex;
      width: 100%;
    `,
  }))}
`;

export const TabMobileListScrollbarWrapper = styled(Scrollbar).attrs(
  ({ theme }) => ({
    variant: 'secondary',
    scrollShadows: {
      color: theme.colors.base.black,
      left: <ScrollbarShadow side="left" />,
      right: <ScrollbarShadow side="right" />,
    },
  }),
)``;

export const TabMobileListContent = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 18px;
`;
