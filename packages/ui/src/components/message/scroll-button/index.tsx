import { useEffect, useState } from 'react';
import {
  MessageListScrollButton,
  MessageListArrowNarrowDownIcon
} from './styled';

import { ScrollbarRef } from '../..';

interface IScrollButton {
  scrollbarRef: React.RefObject<ScrollbarRef>;
}
export const ScrollButton: React.FC<IScrollButton> = ({ scrollbarRef }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const handleScrollToBottom = () => {
    const el = scrollbarRef.current?.element;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollbarRef.current?.element) {
        const { scrollHeight, clientHeight, scrollTop } =
          scrollbarRef.current.element;
        const atBottom =
          Math.round(scrollTop + clientHeight) >= scrollHeight - 10;
        const scrollable = scrollHeight > clientHeight;
        setIsAtBottom(atBottom);
        setIsScrollable(scrollable);
      }
    };

    const element = scrollbarRef.current?.element;
    element?.addEventListener('scroll', checkScrollPosition);

    checkScrollPosition();

    return () => {
      element?.removeEventListener('scroll', checkScrollPosition);
    };
  }, [scrollbarRef.current]);

  if (isAtBottom || !isScrollable) return null;
  return (
    <MessageListScrollButton
      $visible={!isAtBottom && isScrollable}
      onClick={handleScrollToBottom}
      type="button"
      data-test="scroll-button"
    >
      <MessageListArrowNarrowDownIcon size={18} />
    </MessageListScrollButton>
  );
};
