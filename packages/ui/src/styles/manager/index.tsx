import React from 'react';
import { StyleSheetManager } from 'styled-components';
import { BothubStyleSheetPlugin } from './plugin';

export const BothubStyleSheetManager: React.FC<React.PropsWithChildren> = ({
  children
}) => (
  <StyleSheetManager
    stylisPlugins={[
      BothubStyleSheetPlugin
    ]}
  >
    {children}
  </StyleSheetManager>
);
