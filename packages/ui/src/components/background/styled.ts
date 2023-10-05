import { styled, css } from "styled-components";
import grid from './assets/grid.svg';
import { BackgroundVariant } from "./types";
import bluePurple from './assets/blue-purple.webp';

export const BackgroundStyled = styled.div<{ $variant: BackgroundVariant  }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
  ${({ $variant }) => {
    switch ($variant) {
      case 'grid':
        return css`
          background: url(${JSON.stringify(grid)});
          background-size: contain;
          background-position: center;
          opacity: 0.35;
          @media (max-width: 1862px) {
            background-size: cover;
          }
        `;
      default:
        return css``;
    }
  }}
`;

export const BackgroundImage = styled.img``;

export const BackgroundBluePurpleImage = styled(BackgroundImage).attrs({ src: bluePurple, width: 773, height: 576 })`
  height: max-content;
`;
