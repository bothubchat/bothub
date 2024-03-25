import React from 'react';
import { ChipDeleteButton, ChipStyled, ChipText } from './styled';

export type ChipDeleteEventHandler = React.MouseEventHandler<HTMLButtonElement>;

export interface ChipProps extends React.ComponentProps<'div'> {
  start?: React.ReactNode;
  image?: React.ReactNode;
  onDelete?: ChipDeleteEventHandler;
}

export const Chip: React.FC<ChipProps> = ({
  start, image, children, onDelete, ...props
}) => (
  <ChipStyled
    {...props}
  >
    {start}
    {image}
    <ChipText>
      {children}
    </ChipText>
    <ChipDeleteButton
      onClick={onDelete}
    />
  </ChipStyled>
);

export * from './styled';
