import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import ReactMarkdown, { type Components } from 'react-markdown';
import { Portal } from '@/ui/components/portal';
import { useEventCallback } from '@/ui/utils/useEventCallback';
import { useIsomorphicLayoutEffect } from '@/ui/utils/useIsomorphicLayoutEffect';
import {
  TooltipBlock,
  TooltipCode,
  TooltipLabel,
  TooltipLabelBold,
  TooltipMarkdown,
  TooltipStyled,
} from './styled';
import { TooltipArrow } from './arrow';
import { TooltipProvider } from './context';
import { TooltipAlign, TooltipPlacement, TooltipVariant } from './types';

export const TooltipAnimationDuration = {
  enter: 150,
  exit: 150,
  leaveDisabledHiddenAnimation: 0,
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
  hideOnScroll?: boolean;
}

const markdownComponents: Components = {
  p: ({ children }) => <TooltipLabel component="p">{children}</TooltipLabel>,
  b: ({ children }) => <TooltipLabelBold>{children}</TooltipLabelBold>,
  strong: ({ children }) => (
    <TooltipLabelBold component="strong">{children}</TooltipLabelBold>
  ),
  code: ({ children }) => <TooltipCode>{children}</TooltipCode>,
};

const getTooltipPosition = (
  el: Element,
  tooltipEl: HTMLElement,
  placement: TooltipPlacement,
  align: TooltipAlign,
  inverted: boolean,
): [number, number] => {
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
};

const addIdRef = (el: Element, attribute: string, id: string) => {
  const ids = el.getAttribute(attribute)?.split(' ').filter(Boolean) ?? [];
  if (!ids.includes(id)) {
    el.setAttribute(attribute, [...ids, id].join(' '));
  }
};

const removeIdRef = (el: Element, attribute: string, id: string) => {
  const ids = el.getAttribute(attribute)?.split(' ').filter(Boolean) ?? [];
  const nextIds = ids.filter((value) => value !== id);
  if (nextIds.length === ids.length) {
    return;
  }
  if (nextIds.length === 0) {
    el.removeAttribute(attribute);
  } else {
    el.setAttribute(attribute, nextIds.join(' '));
  }
};

interface TooltipPopupProps {
  id: string;
  visible: boolean;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  variant: TooltipVariant;
  placement: TooltipPlacement;
  align: TooltipAlign;
  inverted: boolean;
  label: React.ReactNode;
  contentWidth?: number;
  markdown: boolean;
  disableHiddenAnimation: boolean;
  top: string;
  left: string;
  onExited: () => void;
}

/**
 * Mounted only while the tooltip is shown or playing its leave animation, so
 * idle tooltips don't own a portal or a spring controller.
 */
const TooltipPopup: React.FC<TooltipPopupProps> = ({
  id,
  visible,
  tooltipRef,
  className,
  variant,
  placement,
  align,
  inverted,
  label,
  contentWidth,
  markdown,
  disableHiddenAnimation,
  top,
  left,
  onExited,
}) => {
  // No item while hidden: a `false` item would own its own controller and
  // its (invisible) enter animation would delay the unmount after leave.
  const tooltipTransition = useTransition(visible ? [true] : [], {
    from: { opacity: 0, y: -6 },
    enter: { opacity: 1, y: 0 },
    leave: {
      opacity: 0,
      y: -6,
      config: {
        duration: disableHiddenAnimation
          ? TooltipAnimationDuration.leaveDisabledHiddenAnimation
          : TooltipAnimationDuration.exit,
      },
    },
    config: { duration: TooltipAnimationDuration.enter },
    onDestroyed: (item) => {
      if (item && !visible) {
        onExited();
      }
    },
  });

  return (
    <Portal>
      {tooltipTransition(
        (style, item) =>
          item && (
            <TooltipStyled
              $placement={placement}
              $align={align}
              $inverted={inverted}
              ref={tooltipRef as React.RefObject<HTMLDivElement>}
              id={id}
              className={className}
              role="tooltip"
              style={{
                ...style,
                top,
                left,
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
                  <TooltipMarkdown>
                    <ReactMarkdown components={markdownComponents}>
                      {label}
                    </ReactMarkdown>
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
          ),
      )}
    </Portal>
  );
};

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
  children,
  hideOnScroll = true,
}) => {
  const tooltipId = useId();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [isPopupMounted, setIsPopupMounted] = useState<boolean>(false);
  const [coords, setCoords] = useState<[number, number]>([0, 0]);
  const isDisabled = !label || disabled;
  const visible = hoveredElement !== null && !isDisabled;

  const showTooltip = useCallback((element: Element) => {
    setHoveredElement(element);
    setIsPopupMounted(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setHoveredElement(null);
  }, []);

  const handlePopupExited = useCallback(() => {
    setIsPopupMounted(false);
  }, []);

  const updatePosition = useEventCallback(() => {
    const tooltipEl: HTMLDivElement | null = tooltipRef.current;
    if (hoveredElement === null || tooltipEl === null) {
      return;
    }

    const nextCoords = getTooltipPosition(
      hoveredElement,
      tooltipEl,
      placement,
      align,
      inverted,
    );
    if (nextCoords[0] !== coords[0] || nextCoords[1] !== coords[1]) {
      setCoords(nextCoords);
    }
  });

  const handleMouseEnter = useEventCallback(
    (e: React.MouseEvent<Element, MouseEvent>): void => {
      if (!isDisabled && e.currentTarget instanceof Element) {
        showTooltip(e.currentTarget);
      }
    },
  );

  const handlePointerMove = useEventCallback(
    (e: React.PointerEvent<Element>): void => {
      if (isDisabled || !(e.currentTarget instanceof Element)) {
        return;
      }
      if (e.currentTarget !== hoveredElement) {
        showTooltip(e.currentTarget);
        return;
      }

      updatePosition();
    },
  );

  // Position before paint, so the first frame isn't drawn at a stale place.
  useIsomorphicLayoutEffect(() => {
    if (visible) {
      updatePosition();
    }
  }, [
    visible,
    hoveredElement,
    placement,
    align,
    inverted,
    label,
    contentWidth,
    markdown,
    variant,
    updatePosition,
  ]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    // `mouseout` without a related target means the pointer left the window.
    const handleDocumentMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        hideTooltip();
      }
    };
    const scrollListenerOptions: AddEventListenerOptions = hideOnScroll
      ? { capture: true, passive: true }
      : { passive: true };

    document.addEventListener('mouseout', handleDocumentMouseOut);
    window.addEventListener('scroll', hideTooltip, scrollListenerOptions);

    return () => {
      document.removeEventListener('mouseout', handleDocumentMouseOut);
      window.removeEventListener('scroll', hideTooltip, scrollListenerOptions);
    };
  }, [visible, hideOnScroll, hideTooltip]);

  useEffect(() => {
    if (!visible || hoveredElement === null) {
      return;
    }

    addIdRef(hoveredElement, 'aria-describedby', tooltipId);

    return () => {
      removeIdRef(hoveredElement, 'aria-describedby', tooltipId);
    };
  }, [visible, hoveredElement, tooltipId]);

  let popupNode: React.ReactNode = null;
  if (visible || isPopupMounted) {
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

    popupNode = (
      <TooltipPopup
        id={tooltipId}
        visible={visible}
        tooltipRef={tooltipRef}
        className={className}
        variant={variant}
        placement={placement}
        align={align}
        inverted={inverted}
        label={label}
        contentWidth={contentWidth}
        markdown={markdown}
        disableHiddenAnimation={disableHiddenAnimation}
        top={top.length <= 1 ? top[0] : `calc(${top.join(' + ')})`}
        left={left.length <= 1 ? left[0] : `calc(${left.join(' + ')})`}
        onExited={handlePopupExited}
      />
    );
  }

  return (
    <TooltipProvider
      handleTooltipMouseEnter={handleMouseEnter}
      handleTooltipMouseLeave={hideTooltip}
      handleTooltipPointerMove={handlePointerMove}
    >
      {popupNode}
      {children}
    </TooltipProvider>
  );
};

export * from './styled';
export * from './context';
export * from './types';
