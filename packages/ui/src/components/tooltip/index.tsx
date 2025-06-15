import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import { Portal } from '@/ui/components/portal';
import {
  TooltipBlock,
  TooltipCode,
  TooltipLabel,
  TooltipLabelBold,
  TooltipMarkdown,
  TooltipStyled
} from './styled';
import { TooltipArrow } from './arrow';
import { TooltipProvider } from './context';
import { TooltipAlign, TooltipPlacement, TooltipVariant } from './types';

export const TooltipAnimationDuration = {
  enter: 150,
  exit: 150,
  leaveDisabledHiddenAnimation: 0
};

export interface TooltipProps extends React.PropsWithChildren {
  className?: string;
  variant?: TooltipVariant;
  placement?: TooltipPlacement;
  placementX?: number;
  placementY?: number;
  align?: TooltipAlign;
  inverted?: boolean;
  label?: React.ReactNode;
  contentWidth?: number;
  disabled?: boolean;
  disableHiddenAnimation?: boolean;
  markdown?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  className,
  variant = 'primary',
  placement = 'top',
  placementX = 0,
  placementY = -5,
  align = 'auto',
  inverted = false,
  label,
  contentWidth,
  disabled = false,
  disableHiddenAnimation = false,
  markdown = false,
  children
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoveredElement, sethoveredElement] = useState<Element | null>();
  const [coords, setCoords] = useState<[number, number]>([0, 0]);
  const isDisabled = !label || disabled;

  const getTooltipPosition = useCallback((): [number, number] => {
    const tooltipEl: HTMLDivElement | null = tooltipRef.current;
    if (tooltipEl === null) {
      return [0, 0];
    }
    const el = hoveredElement;
    if (!(el instanceof Element)) {
      return [0, 0];
    }
    const { width: tooltipWidth, height: tooltipHeight } =
      tooltipEl.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const { width: elWidth } = rect;
    const elX = rect.left + window.scrollX;
    const elY = rect.top + window.scrollY;
    const elBottomY = rect.bottom + window.scrollY;

    let x: number = 0;
    switch (placement) {
      case 'top-left':
        switch (align) {
          case 'left':
          case 'auto':
            x = elX;
            break;
          case 'center':
            x = elX - tooltipWidth / 2;
            break;
          case 'right':
            x = elX - tooltipWidth;
            break;
        }
        break;
      case 'top':
        switch (align) {
          case 'left':
            x = elX + elWidth / 2;
            break;
          case 'center':
          case 'auto':
            x = elX + elWidth / 2 - tooltipWidth / 2;
            break;
          case 'right':
            x = elX + elWidth / 2 - tooltipWidth;
            break;
        }
        break;
      case 'top-right':
        switch (align) {
          case 'left':
            x = elX + elWidth;
            break;
          case 'center':
            x = elX + elWidth - tooltipWidth / 2;
            break;
          case 'right':
          case 'auto':
            x = elX + elWidth - tooltipWidth;
            break;
        }
        break;
      case 'center-right':
        x = elX + elWidth - 18;
        break;
      case 'center-left':
        x = elX - tooltipWidth + 18;
        break;
    }
    let y: number = 0;
    switch (placement) {
      case 'top-left':
      case 'top':
      case 'top-right':
        y = inverted ? elBottomY + 6 : elY - tooltipHeight - 6;
        break;
      case 'center-right':
      case 'center-left':
        y = (elY + elBottomY - tooltipHeight + 10) / 2;
        break;
      default:
        y = elBottomY + 6;
        break;
    }

    return [x, y];
  }, [placement, align, hoveredElement]);

  const updatePosition = useCallback(() => {
    if (hoveredElement) {
      setCoords(getTooltipPosition());
    }
  }, [hoveredElement, getTooltipPosition]);

  const hideTooltip = useCallback(() => {
    sethoveredElement(null);
  }, []);

  const top: string[] = [`${coords[1]}px`];
  if (placementY !== 0) {
    top.push(`calc(var(--bothub-scale, 1) * ${placementY}px)`);
  }

  const left: string[] = [`${coords[0]}px`];
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

  const tooltipTransition = useTransition(!!hoveredElement, {
    from: {
      opacity: 0,
      y: -6
    },
    enter: {
      opacity: 1,
      y: 0
    },
    leave: {
      opacity: 0,
      y: -6,
      transition: {
        duration: disableHiddenAnimation ? 0 : 0.3
      }
    },
    config: { duration: TooltipAnimationDuration.enter }
  });

  const tooltipNode: React.ReactNode = tooltipTransition(
    (style, item) =>
      item && (
        <TooltipStyled
          $placement={placement}
          $align={align}
          $inverted={inverted}
          ref={tooltipRef}
          className={className}
          style={{
            ...style,
            top: top.length <= 1 ? top[0] : `calc(${top.join(' + ')})`,
            left: left.length <= 1 ? left[0] : `calc(${left.join(' + ')})`
          }}
        >
          {inverted && (
            <TooltipArrow
              placement={placement}
              variant={variant}
              inverted={inverted}
            />
          )}
          <TooltipBlock
            $contentWidth={contentWidth}
            $variant={variant}
          >
            {typeof label === 'string' && !markdown && (
              <TooltipLabel>
                {label.slice(0, 272)}
                {label.length > 272 && '...'}
              </TooltipLabel>
            )}
            {typeof label === 'string' && markdown && (
              <TooltipMarkdown
                components={{
                  p: ({ children }) => (
                    <TooltipLabel component="p">{children}</TooltipLabel>
                  ),
                  b: ({ children }) => (
                    <TooltipLabelBold>{children}</TooltipLabelBold>
                  ),
                  strong: ({ children }) => (
                    <TooltipLabelBold component="strong">
                      {children}
                    </TooltipLabelBold>
                  ),
                  code: ({ children }) => <TooltipCode>{children}</TooltipCode>
                }}
              >
                {label}
              </TooltipMarkdown>
            )}
            {typeof label !== 'string' && label}
          </TooltipBlock>
          {!inverted && (
            <TooltipArrow
              placement={placement}
              variant={variant}
              inverted={inverted}
            />
          )}
        </TooltipStyled>
      )
  );

  useEffect(() => {
    updatePosition();
  }, [hoveredElement, updatePosition]);

  const handleMouseEnter = (e: React.MouseEvent<Element, MouseEvent>): void => {
    if (!isDisabled && e.currentTarget instanceof Element) {
      sethoveredElement(e.currentTarget);
    }
  };

  const handleMouseLeave = (): void => {
    sethoveredElement(null);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<Element>): void => {
      if (!isDisabled && e.currentTarget instanceof Element) {
        sethoveredElement(e.currentTarget);
        updatePosition();
      }
    },
    [isDisabled, updatePosition]
  );

  useEffect(() => {
    const handleGlobalMouseLeave = () => {
      hideTooltip();
    };

    const handleGlobalScroll = () => {
      hideTooltip();
    };

    window.addEventListener('mouseleave', handleGlobalMouseLeave);
    window.addEventListener('scroll', handleGlobalScroll, true);

    return () => {
      window.removeEventListener('mouseleave', handleGlobalMouseLeave);
      window.removeEventListener('scroll', handleGlobalScroll, true);
    };
  }, [hideTooltip]);

  return (
    <TooltipProvider
      handleTooltipMouseEnter={handleMouseEnter}
      handleTooltipMouseLeave={handleMouseLeave}
      handleTooltipPointerMove={handlePointerMove}
    >
      <Portal>{tooltipNode}</Portal>
      {children}
    </TooltipProvider>
  );
};

export * from './styled';
export * from './context';
export * from './types';
