import { css, styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { Typography } from '@/ui/components/typography';

export const BlockStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border-radius: 18px;
  overflow: hidden;
  max-height: 100vh;
`;

export interface BlockHeadProps {
  $toolbar: boolean;
}

export const BlockHead = styled.div<BlockHeadProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  ${({ $toolbar }) => {
    if ($toolbar) {
      return css`
        padding: 24px 28px;
      `;
    }

    return css`
      padding: 30px 28px;
    `;
  }}
`;

export const BlockTitle = styled(Typography).attrs({ component: 'h2', variant: 'body-xl-semibold' })``;

export const BlockToolbar = styled.div`
  display: flex;
`;

export const BlockToolbarButtons = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export interface BlockBodyProps {
  $head: boolean;
}

export const BlockBody = styled.div<BlockBodyProps>`
  display: flex;
  overflow: hidden;
  width: 100%;
  flex-grow: 1;
  padding-bottom: 28px;
  position: relative;
  ${({ $head }) => !$head && css`
    padding-top: 28px;
  `}
`;

export const BlockBodyScrollbarWrapper = styled(Scrollbar).attrs({
  variant: 'secondary',
  scrollShadows: {
    size: 140,
    top: <ScrollbarShadow side="top" />,
    bottom: <ScrollbarShadow side="bottom" />
  }
})`
  height: 100%;
  overflow: auto;
`;

export interface BlockBodyContentProps {
  $head: boolean;
  $fullHeight: boolean;
}

export const BlockBodyContent = styled.div<BlockBodyContentProps>`
  padding: 34px 28px;
  padding-bottom: 0px;
  ${({ $head }) => !$head && css`
    padding-top: 0px;
  `}
  ${({ $fullHeight }) => $fullHeight && css`
    height: 100%;
  `}
`;
