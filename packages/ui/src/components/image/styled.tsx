import { css, styled } from 'styled-components';

export const ImageImg = styled.img`
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

export const ImagePicture = styled.picture``;

export const ImageSource = styled.source``;
