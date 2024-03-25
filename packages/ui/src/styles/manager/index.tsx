import React from 'react';
import { StyleSheetManager } from 'styled-components';
import { BothubStyleSheetDashboardPlugin, BothubStyleSheetMainPlugin } from './plugin';

export const BothubStyleSheetManager: React.FC<React.PropsWithChildren<{
  variant?: 'main' | 'dashboard';
}>> = ({
  children,
  variant = 'dashboard'
}) => (
  <StyleSheetManager
    stylisPlugins={[
      variant === 'dashboard' ? BothubStyleSheetDashboardPlugin : BothubStyleSheetMainPlugin
    ]}
  >
    {children}
  </StyleSheetManager>
);
