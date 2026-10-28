import { useEffect, useState } from 'react';
import {
  MessageListScrollButton,
  MessageListArrowNarrowDownIcon,
} from './styled';

import { ScrollbarRef } from '@/ui/components/scrollbar';

interface IScrollButton {
  scrollbarRef: React.RefObject<ScrollbarRef | null>;
}
export const ScrollButton: React.FC<IScrollButton> = ({ scrollbarRef }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const handleScrollToBottom = () => {
    const el = scrollbarRef.current?.element;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const element = scrollbarRef.current?.element;
    if (!element) {
      return;
    }

    const checkScrollPosition = () => {
      const { scrollHeight, clientHeight, scrollTop } = element;
      const atBottom =
        Math.round(scrollTop + clientHeight) >= scrollHeight - 10;
      const scrollable = scrollHeight > clientHeight;
      setIsAtBottom(atBottom);
      setIsScrollable(scrollable);
    };

    element.addEventListener('scroll', checkScrollPosition);

    // A streaming reply grows the content without any scroll event.
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(checkScrollPosition);
    resizeObserver?.observe(element);
    Array.from(element.children).forEach((child) => {
      resizeObserver?.observe(child);
    });

    checkScrollPosition();

    return () => {
      element.removeEventListener('scroll', checkScrollPosition);
      resizeObserver?.disconnect();
    };
  }, [scrollbarRef]);

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
