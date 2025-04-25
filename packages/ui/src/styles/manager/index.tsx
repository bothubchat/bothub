import React from 'react';
import { StyleSheetManager } from 'styled-components';
import {
  BothubStyleSheetDashboardPlugin,
  BothubStyleSheetMainPlugin
} from './plugin';

export type BothubStyleSheetManagerProps = React.ComponentProps<
  typeof StyleSheetManager
> & {
  variant?: 'main' | 'dashboard';
};

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
        : BothubStyleSheetMainPlugin
    ]}
  >
    {children}
  </StyleSheetManager>
);
