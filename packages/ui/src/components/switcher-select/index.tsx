import React, { useState, useRef, useEffect } from 'react';
import { SwitcherContainer, SwitcherSlider, SwitcherOption } from './styled';

interface SwitcherProps {
  options: [string, string];
  defaultOption?: 0 | 1;
  onChange?: (selectedIndex: 0 | 1) => void;
  className?: string;
}

export const SwitcherSelect: React.FC<SwitcherProps> = ({
  options,
  defaultOption = 0,
  onChange,
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<0 | 1>(defaultOption);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const option0Ref = useRef<HTMLButtonElement>(null);
  const option1Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    updateSliderPosition();
  }, [selectedIndex]);

  useEffect(() => {
    const handleResize = () => {
      updateSliderPosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedIndex]);

  const updateSliderPosition = () => {
    const refs = [option0Ref, option1Ref];
    const currentRef = refs[selectedIndex];

    if (currentRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const optionRect = currentRef.current.getBoundingClientRect();

      const position = optionRect.left - containerRect.left;
      const { width } = optionRect;

      setSliderPosition(position);
      setSliderWidth(width);
    }
  };

  const handleToggle = () => {
    setSelectedIndex((prev) => (prev === 0 ? 1 : 0));
    onChange?.(selectedIndex === 0 ? 1 : 0);
  };

  return (
    <SwitcherContainer
      ref={containerRef}
      className={className}
    >
      <SwitcherSlider
        style={{
          left: sliderPosition,
          width: sliderWidth,
        }}
      />
      <SwitcherOption
        ref={option0Ref}
        onClick={handleToggle}
      >
        {options[0]}
      </SwitcherOption>
      <SwitcherOption
        ref={option1Ref}
        onClick={handleToggle}
      >
        {options[1]}
      </SwitcherOption>
    </SwitcherContainer>
  );
};
