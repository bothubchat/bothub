import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import { Portal } from '@/ui/components/portal';
import { TooltipBlock, TooltipLabel, TooltipStyled } from './styled';
import { TooltipArrow } from './arrow';
import { TooltipProvider } from './context';
import { TooltipVariant } from './types';

export interface TooltipProps extends React.PropsWithChildren {
  className?: string;
  variant?: TooltipVariant;
  label?: string;
  disablePortal?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  className, variant = 'primary', label, disablePortal = false, children 
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = !label;

  const getTooltipPosition = useCallback((el: Element) => {
    const tooltipEl: HTMLDivElement | null = tooltipRef.current;
    if (tooltipEl === null) {
      return [0, 0];
    }

    const { 
      width: tooltipWidth, height: tooltipHeight
    } = tooltipEl.getBoundingClientRect();
    const {
      x: elX, y: elY, width: elWidth
    } = el.getBoundingClientRect();

    const x: number = elX + (elWidth / 2) - (tooltipWidth / 2);
    const y: number = elY - tooltipHeight - 5;

    return [x, y];
  }, []);

  const handleMouseEnter = useCallback<React.MouseEventHandler<Element>>((event) => {
    if (isDisabled) {
      return;
    }

    setIsHover(true);

    if (!(event.currentTarget instanceof Element)) {
      return;
    }
    
    const el: Element = event.currentTarget;
    const [x, y] = getTooltipPosition(el);

    setElement(el);
    setX(x);
    setY(y);
    setIsVisible(true);
  }, [isDisabled, tooltipRef.current, getTooltipPosition]);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);

    if (!isPressed) {
      setIsVisible(false);
    }
  }, [isPressed]);

  const handleMouseDown = useCallback(() => {
    setIsVisible(true);
    setIsPressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
    if (!isHover) {
      setIsVisible(false);
    }
  }, [isHover]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (element === null) {
        return;
      }

      const [x, y] = getTooltipPosition(element);

      setX(x);
      setY(y);
    });

    if (element !== null) {
      observer.observe(element, { attributes: true, childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [element]);

  const tooltipNode: React.ReactNode = (
    <TooltipStyled
      ref={tooltipRef}
      className={className}
      style={{
        top: y,
        left: x
      }}
      variants={{
        hidden: {
          opacity: 0,
          y: -6,
          transitionEnd: {
            visibility: 'hidden'
          }
        },
        visible: {
          opacity: 1,
          y: 0,
          visibility: 'visible'
        }
      }}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <TooltipBlock
        $variant={variant}
      >
        <TooltipLabel>
          {label}
        </TooltipLabel>
      </TooltipBlock>
      <TooltipArrow 
        variant={variant}
      />
    </TooltipStyled>
  );

  return (
    <TooltipProvider
      handleTooltipMouseEnter={handleMouseEnter}
      handleTooltipMouseLeave={handleMouseLeave}
      handleTooltipMouseUp={handleMouseUp}
      handleTooltipMouseDown={handleMouseDown}
    >
      {disablePortal && tooltipNode}
      {!disablePortal && (
        <Portal>
          {tooltipNode}
        </Portal>
      )}
      {children}
    </TooltipProvider>
  );
};

export * from './context';
export * from './types';
