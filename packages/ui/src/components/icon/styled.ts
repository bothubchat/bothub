import React from 'react';
import { css, styled } from 'styled-components';

export const IconStyled: React.FC<React.ComponentProps<'svg'>> = styled.svg`
  display: inline-flex;
  flex-shrink: 0;
  ${({ width }) => {
    if (typeof width === 'undefined') {
      return css``;
    }
    if (typeof width === 'number') {
      return css`
        width: ${width}px;
      `;
    }

    return css`
      width: ${width};
    `;
  }}
  ${({ height }) => {
    if (typeof height === 'undefined') {
      return css``;
    }
    if (typeof height === 'number') {
      return css`
        height: ${height}px;
      `;
    }

    return css`
      height: ${height};
    `;
  }}
`;
