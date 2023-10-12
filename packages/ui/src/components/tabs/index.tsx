import React from 'react';
import { TabList, TabsStyled } from './styled';

export interface TabsProps extends React.PropsWithChildren {
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  className, children
}) => (
  <TabsStyled
    className={className}
  >
    <TabList>
      {children}
    </TabList>
  </TabsStyled>
);
