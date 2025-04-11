import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as S from './styled';

type SelectFieldGroupProps = S.SelectFieldGroupContentProps & PropsWithChildren;

export const SelectFieldGroup = (props: SelectFieldGroupProps) => {
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleShadowsDisplay = () => {
    if (contentRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = contentRef.current;

      if (scrollTop > 0) {
        setShowTopShadow(true);
      } else {
        setShowTopShadow(false);
      }

      if (Math.floor(scrollHeight - scrollTop - clientHeight) > 0) {
        setShowBottomShadow(true);
      } else {
        setShowBottomShadow(false);
      }
    }
  };

  useEffect(() => {
    const el = contentRef.current;

    if (!el) return;

    const onResize = new ResizeObserver(() => {
      handleShadowsDisplay();
    });

    onResize.observe(el);

    handleShadowsDisplay();

    el.addEventListener('scroll', handleShadowsDisplay);

    return () => {
      onResize.disconnect();
      el.removeEventListener('scroll', handleShadowsDisplay);
    };
  }, [contentRef.current]);

  return (
    <S.SelectFieldGroupStyled>
      <S.Shadow
        $onTop
        $show={showTopShadow}
      />
      <S.SelectFieldGroupContent
        ref={contentRef}
        {...props}
      />
      <S.Shadow $show={showBottomShadow} />
    </S.SelectFieldGroupStyled>
  );
};
