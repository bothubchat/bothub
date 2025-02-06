import React from 'react';
import {
  DeveloperKeyList,
  DeveloperKeysButtons,
  DeveloperKeysHeader,
  DeveloperKeysIcon,
  DeveloperKeysStyled,
  DeveloperKeysTitle
} from './styled';

export interface DeveloperKeysProps extends React.PropsWithChildren {
  title?: string;
  empty?: React.ReactNode;
  add?: React.ReactNode;
}

export const DeveloperKeys: React.FC<DeveloperKeysProps> = ({
  title,
  empty,
  add,
  children
}) => (
  <DeveloperKeysStyled>
    {title && (
      <DeveloperKeysHeader>
        <DeveloperKeysIcon />
        <DeveloperKeysTitle>{title}</DeveloperKeysTitle>
      </DeveloperKeysHeader>
    )}
    {React.Children.toArray(children).length === 0 && empty}
    {React.Children.toArray(children).length !== 0 && (
      <DeveloperKeyList>{children}</DeveloperKeyList>
    )}
    <DeveloperKeysButtons>{add}</DeveloperKeysButtons>
  </DeveloperKeysStyled>
);

export * from './styled';
