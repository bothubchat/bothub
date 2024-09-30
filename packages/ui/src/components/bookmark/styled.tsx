import {
  styled, css, keyframes, DefaultTheme 
} from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons/close';

export const BookmarkName = styled(Typography).attrs({
  variant: 'body-m-semibold',
  component: 'span',
})`
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BookmarkCloseButton = styled(Button).attrs({
  variant: 'text',
  iconSize: 14,
  children: <CloseIcon />,
})``;

const pulse = (theme: DefaultTheme) => keyframes`
  0% {
    box-shadow: 0px 0px 0px 1px ${theme.colors.grayScale.gray5};
  }
  70% {
    box-shadow: 0px 0px 0px 1px ${theme.colors.grayScale.gray1};
  }
  100% {
    box-shadow: 0px 0px 0px 1px ${theme.colors.grayScale.gray5};
  }
`;

export type BookmarkStyledProps = {
  $active: boolean;
  $skeleton?: boolean;
  className?: string;
} & React.ComponentProps<'span'> &
React.PropsWithChildren;

export const BookmarkStyled: React.FC<BookmarkStyledProps> = styled.span<BookmarkStyledProps>`
  display: inline-flex;
  gap: 13px;
  flex-shrink: 0;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  height: 42px;
  margin: 1px;
  ${BookmarkName} {
    color: ${({ theme }) => theme.colors.grayScale.gray1};
  }
  svg path {
    fill: ${({ theme }) => theme.colors.grayScale.gray1} !important;
  }
  ${({ $active }) => $active
    && css`
      cursor: default;
      background: ${({ theme }) => theme.colors.grayScale.gray3};
      ${BookmarkName} {
        color: ${({ theme }) => theme.colors.base.white};
      }
    `}
  ${({ $active }) => !$active
    && css`
      cursor: pointer;
    `}

  transition: box-shadow 0.2s ease-out;
  ${({ $active, $skeleton }) => !$active
    && !$skeleton
    && css`
      &:hover {
        box-shadow: 0px 0px 0px 1px
          ${({ theme }) => theme.colors.grayScale.gray3};
      }
    `}

  ${({ $skeleton, theme }) => $skeleton
    && css`
      animation: ${pulse(theme)} 2s infinite forwards;
    `}
`;
