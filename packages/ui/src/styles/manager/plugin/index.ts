import { Middleware } from 'stylis';

export const BothubStyleSheetDashboardPlugin: Middleware = (element) => {
  if (
    element.type === 'decl'
    && element.props !== 'background'
    && element.props !== 'background-image'
  ) {
    element.value = element.value.replace(/([-0-9.]+)px/g, (_, value) => {
      const pxValue = +value;
      if (Math.abs(pxValue) <= 1) {
        return `${pxValue}px`;
      }
      return `calc(var(--bothub-scale, 1) * ${pxValue}px)`;
    });
    element.value = element.value.replace(/([-0-9.]+)vh/g, (_, value) => {
      const vhValue = +value;

      return `calc(var(--bothub-vh, 1vh) * ${vhValue})`;
    });
  }
};

const MIN_FONT_SIZE = 12;
const MIN_LINE_HEIGHT = 16;

export const BothubStyleSheetMainPlugin: Middleware = (element) => {
  if (
    element.type === 'decl'
    && element.props !== 'background'
    && element.props !== 'background-image'
  ) {
    element.value = element.value.replace(/([-0-9.]+)px/g, (_, value) => {
      const pxValue = +value;
      if (Math.abs(pxValue) <= 1) {
        return `${pxValue}px`;
      }
      if (element.props === 'font-size') {
        return `max(calc(var(--bothub-scale, 1) * ${pxValue}px), ${MIN_FONT_SIZE}px)`;
      }
      if (element.props === 'line-height') {
        return `max(calc(var(--bothub-scale, 1) * ${pxValue}px), ${MIN_LINE_HEIGHT}px)`;
      }
      return `calc(var(--bothub-scale, 1) * ${pxValue}px)`;
    });
    element.value = element.value.replace(/([-0-9.]+)vh/g, (_, value) => {
      const vhValue = +value;

      return `calc(var(--bothub-vh, 1vh) * ${vhValue})`;
    });
  }
};
