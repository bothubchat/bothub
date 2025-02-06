import { styled, css } from 'styled-components';
import grid from './assets/grid.svg';
import { BackgroundVariant } from './types';
import bluePurpleCenter from './assets/blue-purple-center.svg';
import bluePurpleBottomLeft from './assets/blue-purple-bottom-left.svg';

export interface BackgroundStyledProps {
  $variant: BackgroundVariant;
  $disableRepeat: boolean;
}

export const BackgroundStyled = styled.div<BackgroundStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
  ${({ $variant, $disableRepeat }) => {
    switch ($variant) {
      case 'grid':
        return css`
          background: url(${JSON.stringify(grid)});
          background-size: contain;
          background-position: center;
          ${!$disableRepeat &&
          css`
            background-repeat: repeat;
          `}
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

export const BackgroundBluePurpleCenterImage = styled(BackgroundImage).attrs({
  src: bluePurpleCenter,
  width: 773,
  height: 576
})`
  width: 773px;
  height: 576px;
`;

export const BackgroundBluePurpleBottomLeftImage = styled(
  BackgroundImage
).attrs({ src: bluePurpleBottomLeft, width: 663, height: 300 })`
  width: 663px;
  height: 300px;
`;
