import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import { Portal } from '@/ui/components/portal';
import {
  TooltipBlock, TooltipCode, TooltipLabel, TooltipLabelBold, TooltipMarkdown, TooltipStyled 
} from './styled';
import { TooltipArrow } from './arrow';
import { TooltipProvider } from './context';
import { TooltipAlign, TooltipPlacement, TooltipVariant } from './types';

export interface TooltipProps extends React.PropsWithChildren {
  className?: string;
  variant?: TooltipVariant;
  placement?: TooltipPlacement;
  placementX?: number;
  placementY?: number;
  align?: TooltipAlign;
  label?: React.ReactNode;
  disabled?: boolean;
  disableHiddenAnimation?: boolean;
  markdown?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  className, variant = 'primary', placement = 'top', placementX = 0, placementY = -5, align = 'auto', label, 
  disabled = false, disableHiddenAnimation = false, markdown = false, children 
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = !label || disabled;

  const getTooltipPosition = useCallback((el: Element) => {
    const tooltipEl: HTMLDivElement | null = tooltipRef.current;
    if (tooltipEl === null) {
      return [0, 0];
    }

    const { 
      width: tooltipWidth, height: tooltipHeight
    } = tooltipEl.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const { width: elWidth } = rect;
    const elX = rect.left + window.scrollX;
    const elY = rect.top + window.scrollY;

    let x: number;
    switch (placement) {
      case 'top-left':
        switch (align) {
          case 'left':
          case 'auto':
            x = elX;
            break;
          case 'center':
            x = elX - (tooltipWidth / 2);
            break;
          case 'right':
            x = elX - tooltipWidth;
            break;
        }
        break;
      case 'top':
        switch (align) {
          case 'left':
            x = elX + (elWidth / 2);
            break;
          case 'center':
          case 'auto':
            x = elX + (elWidth / 2) - (tooltipWidth / 2);
            break;
          case 'right':
            x = elX + (elWidth / 2) - tooltipWidth;
            break;
        }
        break;
      case 'top-right':
        switch (align) {
          case 'left':
            x = elX + elWidth;
            break;
          case 'center':
            x = elX + elWidth - (tooltipWidth / 2);
            break;
          case 'right':
          case 'auto':
            x = elX + elWidth - tooltipWidth;
            break;
        }
        break;
    }
    const y: number = elY - tooltipHeight;

    return [x, y];
  }, [placement, align]);

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
  }, [isDisabled, placement, align]);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);

    if (!isPressed) {
      setIsVisible(false);
    }
  }, [isPressed]);

  const handleMouseDown = useCallback(() => {
    if (isDisabled) {
      return;
    }

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

  const top: string[] = [
    `${y}px`
  ];
  if (placementY !== 0) {
    top.push(`calc(var(--bothub-scale, 1) * ${placementY}px)`);
  }

  const left: string[] = [
    `${x}px`
  ];
  switch (placement) {
    case 'top-left':
      switch (align) {
        case 'center':
          left.push('14.5px');
          break;
        case 'right':
          left.push('29px');
          break;
      }
      break;
    case 'top':
      switch (align) {
        case 'left':
          left.push('-14.5px');
          break;
        case 'right':
          left.push('14.5px');
          break;
      }
      break;
    case 'top-right':
      switch (align) {
        case 'left':
          left.push('-29px');
          break;
        case 'center':
          left.push('-14.5px');
          break;
      }
      break;
  }
  if (placementX !== 0) {
    left.push(`calc(var(--bothub-scale, 1) * ${placementX}px)`);
  }

  const tooltipNode: React.ReactNode = (
    <TooltipStyled
      $placement={placement}
      $align={align}
      ref={tooltipRef}
      className={className}
      style={{
        top: top.length <= 1 ? top[0] : `calc(${top.join(' + ')})`,
        left: left.length <= 1 ? left[0] : `calc(${left.join(' + ')})`
      }}
      variants={{
        hidden: {
          opacity: 0,
          y: -6,
          transition: {
            duration: disableHiddenAnimation ? 0 : 0.3
          }
        },
        visible: {
          opacity: 1,
          y: 0
        }
      }}
      initial={isVisible ? 'visible' : 'hidden'}
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <TooltipBlock
        $variant={variant}
      >
        {(typeof label === 'string' && !markdown) && (
          <TooltipLabel>
            {label.slice(0, 272)}
            {label.length > 272 && '...'}
          </TooltipLabel>
        )}
        {(typeof label === 'string' && markdown) && (
          <TooltipMarkdown
            components={{
              p: ({ children }) => (
                <TooltipLabel
                  component="p"
                >
                  {children}
                </TooltipLabel>
              ),
              b: ({ children }) => (
                <TooltipLabelBold>
                  {children}
                </TooltipLabelBold>
              ),
              strong: ({ children }) => (
                <TooltipLabelBold
                  component="strong"
                >
                  {children}
                </TooltipLabelBold>
              ),
              code: ({ children }) => (
                <TooltipCode>
                  {children}
                </TooltipCode>
              )
            }}
          >
            {label}
          </TooltipMarkdown>
        )}
        {typeof label !== 'string' && label}
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
      <Portal>
        {isVisible && tooltipNode}
      </Portal>
      {children}
    </TooltipProvider>
  );
};

export * from './styled';
export * from './context';
export * from './types';
