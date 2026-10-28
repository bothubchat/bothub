import React, { useState, useRef, useEffect } from 'react';
import { SwitcherContainer, SwitcherSlider, SwitcherOption } from './styled';

interface SwitcherProps {
  options: [string, string];
  defaultOption?: 0 | 1;
  onChange?: (selectedIndex: 0 | 1) => void;
  className?: string;
}

interface SliderRect {
  left: number;
  width: number;
}

export const SwitcherSelect: React.FC<SwitcherProps> = ({
  options,
  defaultOption = 0,
  onChange,
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<0 | 1>(defaultOption);
  const [slider, setSlider] = useState<SliderRect>({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const option0Ref = useRef<HTMLButtonElement>(null);
  const option1Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const option = (selectedIndex === 0 ? option0Ref : option1Ref).current;
    if (!container || !option) {
      return;
    }

    const updateSliderPosition = () => {
      const containerRect = container.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();
      const left = optionRect.left - containerRect.left;
      const { width } = optionRect;

      setSlider((prev) =>
        prev.left === left && prev.width === width ? prev : { left, width },
      );
    };

    updateSliderPosition();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateSliderPosition);
      return () => window.removeEventListener('resize', updateSliderPosition);
    }

    // The container is as wide as the options, so it resizes with them too
    const observer = new ResizeObserver(updateSliderPosition);
    observer.observe(container);
    return () => observer.disconnect();
  }, [selectedIndex]);

  const handleSelect = (index: 0 | 1) => {
    if (index === selectedIndex) {
      return;
    }

    setSelectedIndex(index);
    onChange?.(index);
  };

  return (
    <SwitcherContainer
      ref={containerRef}
      className={className}
      role="group"
    >
      <SwitcherSlider
        aria-hidden
        style={{
          left: slider.left,
          width: slider.width,
        }}
      />
      <SwitcherOption
        ref={option0Ref}
        type="button"
        aria-pressed={selectedIndex === 0}
        onClick={() => handleSelect(0)}
      >
        {options[0]}
      </SwitcherOption>
      <SwitcherOption
        ref={option1Ref}
        type="button"
        aria-pressed={selectedIndex === 1}
        onClick={() => handleSelect(1)}
      >
        {options[1]}
      </SwitcherOption>
    </SwitcherContainer>
  );
};
