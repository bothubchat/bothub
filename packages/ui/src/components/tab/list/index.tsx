import React from 'react';
import {
  TabDesktopList,
  TabMobileList,
  TabMobileListContent,
  TabMobileListScrollbarWrapper,
  TabsStyled,
} from './styled';

export interface TabsProps extends React.PropsWithChildren {
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ className, children }) => (
  <TabsStyled className={className}>
    <TabDesktopList>{children}</TabDesktopList>
    <TabMobileList>
      <TabMobileListScrollbarWrapper>
        <TabMobileListContent>{children}</TabMobileListContent>
      </TabMobileListScrollbarWrapper>
    </TabMobileList>
  </TabsStyled>
);
