import React from 'react';
import { BothubScaleVariant } from './types';
import { BothubScaleGlobalStyleStyled } from './styled';

export interface BothubScaleGlobalStyleProps {
  variant: BothubScaleVariant;
}

export const BothubScaleGlobalStyle: React.FC<BothubScaleGlobalStyleProps> = ({
  variant,
}) => <BothubScaleGlobalStyleStyled $variant={variant} />;

export * from './types';
export * from './styled';
