import { css, styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';
import { BlockVariant } from './types';

export interface BlockStyledProps {
  $variant: BlockVariant;
}

export const BlockStyled = styled.div<BlockStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  transition: background 0.3s;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  overflow: hidden;
  max-height: 100vh;
  ${({ $variant }) => {
    switch ($variant) {
      case 'rounded':
        return adaptive({
          variant: 'dashboard',
          desktop: css`
            border-radius: 18px;
          `,
          tablet: css`
            border-radius: 18px;
          `,
        });
      case 'rectangular':
        return adaptive({
          variant: 'dashboard',
          tablet: css`
            border-radius: 18px;
          `,
        });
    }
  }}
`;

export interface BlockHeadProps {
  $toolbar: boolean;
}

export const BlockHead = styled.div<BlockHeadProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${adaptive({
    desktop: css`
      border: none;
    `,
    tablet: css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
    `,
    mobile: css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
    `,
  })}

  ${({ $toolbar }) => {
    if ($toolbar) {
      return adaptive({
        variant: 'dashboard',
        desktop: css`
          padding: 24px 28px;
        `,
        tablet: css`
          padding: 24px;
        `,
        mobile: css`
          padding: 18px 16px;
        `,
      });
    }

    return adaptive({
      variant: 'dashboard',
      desktop: css`
        padding: 30px 28px;
      `,
      tablet: css`
        padding: 24px;
      `,
      mobile: css`
        padding: 18px 16px;
      `,
    });
  }}
`;

export const BlockTitle = styled(Typography).attrs({
  component: 'h2',
  variant: 'body-xl-semibold',
})``;

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
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      padding: 28px 0px;
    `,
    tablet: css`
      padding: 24px 0px;
    `,
  })}
  ${({ $head }) => $head
    && css`
      padding-top: 0px !important;
    `}
  position: relative;
`;

export const BlockBodyScrollbarWrapper = styled(Scrollbar).attrs({
  variant: 'secondary',
  scrollShadows: {
    size: 90,
    top: <ScrollbarShadow side="top" />,
    bottom: <ScrollbarShadow side="bottom" />,
  },
})`
  height: 100%;
  overflow: auto;
`;

export interface BlockBodyContentProps {
  $head: boolean;
  $fullHeight: boolean;
}

export const BlockBodyContent = styled.div<BlockBodyContentProps>`
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      padding: 0px 28px;
    `,
    tablet: css`
      padding: 0px 24px;
    `,
    mobile: css`
      padding: 0px 16px;
    `,
  })}
  ${({ $head }) => $head
    && adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`
        padding-top: 28px !important;
      `,
      tablet: css`
        padding-top: 24px !important;
      `,
    })}
  ${({ $fullHeight }) => $fullHeight
    && css`
      height: 100%;
    `}
`;
