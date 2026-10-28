import React from 'react';
import { styled } from 'styled-components';

const getSizeStyle = (
  property: 'width' | 'height',
  value: number | string | undefined,
): string => {
  if (typeof value === 'undefined') {
    return '';
  }
  if (typeof value === 'number') {
    return `${property}: ${value}px;`;
  }

  return `${property}: ${value};`;
};

// Plain strings instead of nested css`` keep the per-render style
// evaluation cheap: this component is rendered for every icon.
export const IconStyled: React.FC<React.ComponentProps<'svg'>> = styled.svg`
  display: inline-flex;
  flex-shrink: 0;
  ${({ width, height }) =>
    getSizeStyle('width', width) + getSizeStyle('height', height)}
`;
