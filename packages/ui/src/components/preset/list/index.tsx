import React from 'react';
import { PresetList, PresetsEnd, PresetsStyled } from './styled';

export interface PresetsProps extends React.ComponentProps<'div'> {
  endRef?: React.Ref<HTMLDivElement>;
}

export const Presets: React.FC<PresetsProps> = ({
  children, endRef, ...props
}) => (
  <PresetsStyled
    {...props}
  >
    <PresetList>
      {children}
    </PresetList>
    <PresetsEnd 
      ref={endRef}
    />
  </PresetsStyled>
);
