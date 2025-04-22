import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import * as S from './styled';

type SelectFieldGroupProps = {
  scrollTop: number;
  onScrollTopChange: (value: number) => void;
} & S.SelectFieldGroupContentProps &
  PropsWithChildren;

export const SelectFieldGroup = ({
  scrollTop,
  onScrollTopChange,
  ...rest
}: SelectFieldGroupProps) => {
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

      onScrollTopChange(scrollTop);
    }
  }, [contentRef.current, onScrollTopChange]);

  useEffect(() => {
    const el = contentRef.current;

    if (!el) return;

    el.scrollTop = scrollTop;

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
  }, [contentRef.current, scrollTop]);

  return (
    <S.SelectFieldGroupStyled>
      <S.Shadow
        $onTop
        $show={showTopShadow}
      />
      <S.SelectFieldGroupContent
        ref={contentRef}
        {...rest}
      />
      <S.Shadow $show={showBottomShadow} />
    </S.SelectFieldGroupStyled>
  );
};
