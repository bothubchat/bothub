import { css, styled } from 'styled-components';
import { Typography } from '../typography';

export const ScrollableTabsTab = styled.a<{ $selected?: boolean }>`
  all: unset;
  cursor: pointer;
  padding: 12.5px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  position: relative;
  margin-bottom: 3px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
    background-color: ${({ theme }) => theme.colors.base.black};

    ${({ $selected }) =>
      $selected &&
      css`
        border: none;
        background: linear-gradient(90deg, #1c64f2 0%, #d41cf2 100%);
        opacity: 0.2;
      `};
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ScrollableTabsTabLabel = styled(Typography).attrs({
  variant: 'body-l-regular'
})``;
