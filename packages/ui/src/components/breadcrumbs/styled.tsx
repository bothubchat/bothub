import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const BreadcrumbsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.default.colors.grayScale.gray1};
`;

export const BreadcrumbsItem = styled(Typography).attrs({
  variant: 'body-m-regular'
})<{ $link?: boolean }>`
  display: flex;
  color: inherit;
  ${({ theme, component }) =>
    component === 'a' &&
    css`
      cursor: pointer;
      transition: 0.25s color;
      &:hover {
        color: ${theme.colors.base.white};
      }
    `};
`;

export const BreadcrumbsSeparator = styled(Typography).attrs({
  variant: 'body-m-regular',
  component: 'p',
  children: '/'
})`
  display: flex;
  color: inherit;
`;
