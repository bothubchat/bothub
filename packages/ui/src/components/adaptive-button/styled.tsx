import { styled, css } from 'styled-components';
import {
  Button,
  ButtonSize,
  ButtonVariant,
  ButtonText
} from '@/ui/components/button';
import { Tooltip } from '@/ui/components/tooltip';
import { adaptive } from '@/ui/adaptive';

export interface AdaptiveButtonStyledProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
}

export const AdaptiveButtonStyled = styled(Button)<AdaptiveButtonStyledProps>`
  ${adaptive(({ $variant, $size }) => ({
    mobile: css`
      ${() => {
        switch ($variant) {
          case 'primary':
          case 'primary-transparent':
          case 'secondary':
            switch ($size) {
              case 'md':
                return css`
                  padding: 14px;
                `;
              default:
                return css`
                  padding: 10px;
                `;
            }
          case 'text':
          case 'help':
            return css`
              padding: 0px;
            `;
        }
      }}
      ${ButtonText} {
        display: none;
      }
    `
  }))}
`;

export const AdaptiveButtonTooltip = styled(Tooltip)`
  ${adaptive({
    desktop: css`
      display: none;
    `,
    tablet: css`
      display: none;
    `
  })}
`;
