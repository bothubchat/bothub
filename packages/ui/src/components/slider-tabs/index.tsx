import React, { useRef } from 'react';
import {
  SliderTabsStyled,
  SliderTabsScrollBar,
  SliderTabsWrapper,
  SliderTabsItem,
  SliderTabsItemText,
  SliderTabsArrow
} from './styled';
import { ScrollbarRef } from '../scrollbar';

export const SliderTabs: React.FC = () => {
  const scrollbarRef = useRef<ScrollbarRef>(null);
  const [isEnd, setIsEnd] = React.useState(false);

  return (
    <SliderTabsStyled>
      <SliderTabsWrapper>
        {isEnd && <SliderTabsArrow $place="left" />}
        <SliderTabsScrollBar ref={scrollbarRef}>
          {[
            'Текст',
            'Изображение',
            'Голос',
            'Изображение',
            'Голос',
            'Изображение',
            'Голос'
          ].map((item, index) => (
            <SliderTabsItem
              onClick={() => setIsEnd(true)}
              key={index}
            >
              <SliderTabsItemText>{item}</SliderTabsItemText>
            </SliderTabsItem>
          ))}
        </SliderTabsScrollBar>
        {!isEnd && <SliderTabsArrow $place="right" />}
      </SliderTabsWrapper>
    </SliderTabsStyled>
  );
};
