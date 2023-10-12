import React, { useState } from 'react';
import {
  SidebarBody,
  SidebarBodyContent,
  SidebarBodyScrollbarWrapper,
  SidebarBottom,
  SidebarContent,
  SidebarHead, 
  SidebarStyled,
  SidebarTop 
} from './styled';
import { SidebarProvider } from './context';

export interface SidebarProps extends React.PropsWithChildren {
  className?: string;
  id?: string;
  createChat?: React.ReactNode;
  toggle?: React.ReactNode;
  user?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className, id, user, createChat, toggle, children 
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarProvider
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <SidebarStyled
        className={className}
        id={id}
      >
        <SidebarContent>
          <SidebarTop>
            <SidebarHead>
              {createChat}
              {toggle}
            </SidebarHead>
            <SidebarBody>
              <SidebarBodyScrollbarWrapper>
                <SidebarBodyContent>
                  {children}
                </SidebarBodyContent>
              </SidebarBodyScrollbarWrapper>
            </SidebarBody>
          </SidebarTop>
          <SidebarBottom>
            {user}
          </SidebarBottom>
        </SidebarContent>
      </SidebarStyled>
    </SidebarProvider>
  );  
};

export * from './styled';
export * from './context';
export * from './toggle-button';
export * from './create-chat-button';
export * from './user-info';
export * from './collapse';
export * from './chat';
export * from './group';
