import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import * as S from './styled';

type SelectFieldGroupProps = S.SelectFieldGroupContentProps & PropsWithChildren;

export const SelectFieldGroup = (props: SelectFieldGroupProps) => {
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleShadowsDisplay = useCallback(() => {
    const el = contentRef.current;

    if (el) {
      const { scrollTop, clientHeight, scrollHeight } = el;

      setShowTopShadow(scrollTop > 1);

      setShowBottomShadow(
        Math.floor(scrollHeight - scrollTop - clientHeight) > 1
      );
    }
  }, [contentRef.current]);

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
