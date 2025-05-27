import { css, styled } from 'styled-components';
import { ArrowNarrowRightIcon } from '@/ui/icons';
import { Typography } from '../typography';

export const TagBadgeStyled = styled.div<{ $color?: string }>`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  flex-shrink: 0;
  border-radius: 14px;
  border: 1.5px solid
    ${({ theme, $color }) => $color || theme.colors.base.white};
  transition: background-color 0.2s;

  &:hover {
    ${({ theme, $color }) => {
      const color = $color || theme.colors.base.white;

      if (color === theme.colors.base.white) {
        return css`
          background-color: ${color};

          span {
            color: ${({ theme }) => theme.colors.base.black};
          }

          path {
            fill: ${({ theme }) => theme.colors.base.black};
          }
        `;
      }

      return css`
        background-color: ${color};
      `;
    }}
  }
`;

export const TagBadgeName = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  transition: color 0.2s;
`;

export const TagBadgeIcon = styled(ArrowNarrowRightIcon)`
  width: 12px;
  height: 12px;
  transform: rotate(-45deg);

  path {
    fill: ${({ theme }) => theme.colors.base.white};
    transition: fill 0.2s;
  }
`;
