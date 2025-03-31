import { css, styled } from 'styled-components';
import { Typography } from '../typography';
import { Variant } from './types';

type VariantProps = { $variant: Variant };

export const ScrollableTabsTab = styled.a<
  {
    $selected?: boolean;
  } & VariantProps
>`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  margin-bottom: 3px;

  ${({ $variant }) =>
    $variant === 'primary'
      ? css`
          padding: 12.5px 16px;
          gap: 16px;

          svg {
            width: 24px;
            height: 24px;
          }
        `
      : css`
          padding: 10px 18px;
          gap: 10px;

          svg {
            width: 18px;
            height: 18px;
          }
        `};

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    ${({ $variant, $selected }) => {
      if ($selected) {
        return css`
          border-radius: 16px;
          background: linear-gradient(90deg, #1c64f2 0%, #d41cf2 100%);
          opacity: 0.2;
        `;
      }

      if ($variant === 'primary') {
        return css`
          border-radius: 16px;
          border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
          background-color: ${({ theme }) => theme.colors.base.black};
        `;
      }

      if ($variant === 'secondary') {
        return css`
          border-radius: 8px;
          background-color: ${({ theme }) => theme.colors.grayScale.gray7};
        `;
      }
    }};
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const ScrollableTabsTabLabel = styled(Typography).attrs<VariantProps>(
  (props) => ({
    variant: props.$variant === 'primary' ? 'body-l-regular' : 'button-sm'
  })
)``;
