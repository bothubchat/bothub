import React from 'react';
import { StyleSheetManager, createGlobalStyle } from 'styled-components';
import {
  BothubStyleSheetDashboardPlugin,
  BothubStyleSheetMainPlugin,
} from './plugin';
import { getScaleDeclarations } from '../zero-runtime/scale';

export type BothubStyleSheetManagerProps = React.ComponentProps<
  typeof StyleSheetManager
> & {
  variant?: 'main' | 'dashboard';
};

const scaleDeclarations = {
  main: getScaleDeclarations('main'),
  dashboard: getScaleDeclarations('dashboard'),
};

// The stylis plugins scale the styled components' CSS. Static CSS (components
// styled without styled-components) scales the same way when these variables
// are set, see `scaled()` in styles/zero-runtime.
const ZeroRuntimeScaleStyle = createGlobalStyle<{
  $variant: 'main' | 'dashboard';
}>`
  :root {
    ${({ $variant }) =>
      Object.entries(scaleDeclarations[$variant])
        .map(([name, value]) => `${name}: ${value};`)
        .join('\n')}
  }
`;

export const BothubStyleSheetManager = ({
  children,
  variant = 'dashboard',
  ...props
}: BothubStyleSheetManagerProps) => (
  <StyleSheetManager
    {...props}
    stylisPlugins={[
      variant === 'dashboard'
        ? BothubStyleSheetDashboardPlugin
        : BothubStyleSheetMainPlugin,
    ]}
  >
    <ZeroRuntimeScaleStyle $variant={variant} />
    {children}
  </StyleSheetManager>
);
