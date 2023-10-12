import React from 'react';
import {
  DeveloperKeyList, DeveloperKeysButtons, DeveloperKeysStyled, DeveloperKeysTitle 
} from './styled';

export interface DeveloperKeysProps extends React.PropsWithChildren {
  title?: string;
  add?: React.ReactNode;
}

export const DeveloperKeys: React.FC<DeveloperKeysProps> = ({
  title, add, children
}) => (
  <DeveloperKeysStyled>
    {title && (
      <DeveloperKeysTitle>
        {title}
      </DeveloperKeysTitle>
    )}
    <DeveloperKeyList>
      {children}
    </DeveloperKeyList>
    <DeveloperKeysButtons>
      {add}
    </DeveloperKeysButtons>
  </DeveloperKeysStyled>
);

export * from './styled';
