import React from 'react';
import {
  AdaptiveBlockDesktopText, 
  AdaptiveBlockMobileText, 
  AdaptiveBlockStyled, 
  AdaptiveBlockTabletText, 
  AdaptiveBlockTouchText 
} from './styled';

export interface AdaptiveBlockProps {
  merge?: boolean;
}

export const AdaptiveBlock: React.FC<AdaptiveBlockProps> = ({
  merge = false
}) => (
  <AdaptiveBlockStyled
    $merge={merge}
    title="Adaptive"
  >
    <AdaptiveBlockDesktopText>
      Desktop Text
    </AdaptiveBlockDesktopText>
    <AdaptiveBlockTabletText>
      Tablet Text
    </AdaptiveBlockTabletText>
    <AdaptiveBlockMobileText>
      Mobile Text
    </AdaptiveBlockMobileText>
    <AdaptiveBlockTouchText>
      Touch Text
    </AdaptiveBlockTouchText>
  </AdaptiveBlockStyled>
);
