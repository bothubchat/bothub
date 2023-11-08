import { css } from 'styled-components';
import type { RuleSet, Interpolation, ExecutionContext } from 'styled-components/dist/types';

export interface Adaptive {
  merge?: boolean;
  desktop?: string | number | RuleSet<object>;
  tablet?: string | number | RuleSet<object>;
  mobile?: string | number | RuleSet<object>;
  touch?: string | number | RuleSet<object>;
}

export type AdaptiveFn<Props extends object> = (props: ExecutionContext & Props) => Adaptive;

export function adaptive
<Props extends object>(fn: AdaptiveFn<Props>): Interpolation<Props> {
  return (props) => {
    const { theme } = props;
    const {
      merge = false, desktop, tablet, mobile, touch
    } = fn(props);

    const touchStyle = touch && css`
      @media only screen and (hover: none) and (pointer: coarse) {
        ${touch}
      }
    `;

    if (merge) {
      return css`
        ${desktop}
        ${tablet && css`
          @media (max-width: ${theme.tablet.maxWidth}) {
            ${tablet}
          }
        `}
        ${mobile && css`
          @media (max-width: ${theme.mobile.maxWidth}) {
            ${mobile}
          }
        `}
        ${touchStyle}
      `;
    }
  
    return css`
      ${desktop && css`
        @media (min-width: ${parseInt(theme.tablet.maxWidth) + 1}px) {
          ${desktop}
        }
      `}
      ${tablet && css`
        @media (min-width: ${parseInt(theme.mobile.maxWidth) + 1}px) and (max-width: ${theme.tablet.maxWidth}) {
          ${tablet}
        }
      `}
      ${mobile && css`
        @media (max-width: ${theme.mobile.maxWidth}) {
          ${mobile}
        }
      `}
      ${touchStyle}
    `;
  };
}
