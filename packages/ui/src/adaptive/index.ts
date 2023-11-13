import { css } from 'styled-components';
import type { RuleSet, Interpolation, ExecutionContext } from 'styled-components/dist/types';

export type AdaptiveVariant = 'main' | 'dashboard';

export type AdaptiveStyle = string | number | false | RuleSet<object>;

export interface AdaptiveOptions {
  variant?: AdaptiveVariant;
  merge?: boolean;
  desktop?: AdaptiveStyle;
  tablet?: AdaptiveStyle;
  miniTablet?: AdaptiveStyle;
  mobile?: AdaptiveStyle;
  touch?: AdaptiveStyle;
}

export type AdaptiveFn<Props extends object> = (props: ExecutionContext & Props) => AdaptiveOptions;

export function adaptive
<Props extends object>(optionsOrFn: AdaptiveOptions | AdaptiveFn<Props>): Interpolation<Props> {
  return (props) => {
    const { theme } = props;
    const {
      variant = 'main', merge = false, desktop, tablet, miniTablet, mobile, touch
    } = typeof optionsOrFn === 'object' ? optionsOrFn : optionsOrFn(props);

    let tabletMaxWidth: string;
    let mobileMaxWidth: string;
    switch (variant) {
      case 'main':
        tabletMaxWidth = theme.tablet.maxWidth;
        mobileMaxWidth = theme.mobile.maxWidth;
        break;
      case 'dashboard':
        tabletMaxWidth = theme.dashboard.tablet.maxWidth;
        mobileMaxWidth = theme.dashboard.mobile.maxWidth;
        break;
    }

    const touchStyle = touch && css`
      @media only screen and (hover: none) and (pointer: coarse) {
        ${touch}
      }
    `;
    const isMiniTablet = variant === 'dashboard' && miniTablet;
    const miniTabletMaxWidth: string = theme.dashboard.miniTablet.maxWidth;

    if (merge) {
      return css`
        ${desktop}
        ${tablet && css`
          @media (max-width: ${tabletMaxWidth}) {
            ${tablet}
          }
        `}
        ${isMiniTablet && css`
          @media (max-width: ${theme.dashboard.miniTablet.maxWidth}) {
            ${miniTablet}
          }
        `}
        ${mobile && css`
          @media (max-width: ${mobileMaxWidth}) {
            ${mobile}
          }
        `}
        ${touchStyle}
      `;
    }
  
    return css`
      ${desktop && css`
        @media (min-width: ${parseInt(tabletMaxWidth) + 1}px) {
          ${desktop}
        }
      `}
      ${tablet && css`
        ${!isMiniTablet && css`
          @media (min-width: ${parseInt(mobileMaxWidth) + 1}px) and (max-width: ${tabletMaxWidth}) {
            ${tablet}
          }
        `}
        ${isMiniTablet && css`
          @media (min-width: ${parseInt(miniTabletMaxWidth) + 1}px) and (max-width: ${tabletMaxWidth}) {
            ${tablet}
          }
          @media (min-width: ${parseInt(mobileMaxWidth) + 1}px) and (max-width: ${miniTabletMaxWidth}) {
            ${miniTablet}
          }
        `}
      `}
      ${mobile && css`
        @media (max-width: ${mobileMaxWidth}) {
          ${mobile}
        }
      `}
      ${touchStyle}
    `;
  };
}

export * from './context';
