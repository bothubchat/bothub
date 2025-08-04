import { render, RenderOptions } from '@testing-library/react';
import { TestProvider, TestProviderProps } from './TestProvider';

export type CustomRenderOptions = {
  providerProps?: TestProviderProps;
} & RenderOptions;

export const customRender = (
  ui: React.ReactElement,
  { providerProps, ...renderOptions }: CustomRenderOptions = {},
) =>
  render(<TestProvider {...providerProps}>{ui}</TestProvider>, renderOptions);
