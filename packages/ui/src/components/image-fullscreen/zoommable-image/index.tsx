import React, { useCallback, useState, useRef } from 'react';
import {
  ZoommableImageContainer,
  ZoommableImageWrapper,
  ZoommableImageStyled
} from './styled';

export interface ZoommableImageProps {
  className?: string;
  imageProps?: React.ComponentProps<typeof ZoommableImageStyled>;
  onZoomStart?: () => void;
  onZoomEnd?: () => void;
}

export const ZoommableImage = ({
  imageProps,
  className,
  onZoomStart,
  onZoomEnd
}: ZoommableImageProps) => {
  const [zoom, setZoom] = useState(1);
  const isZooming = zoom !== 1;

  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getBoundedPosition = useCallback(
    (x: number, y: number) => {
      if (!wrapperRef.current) return { x, y };

      const wrapper = wrapperRef.current.getBoundingClientRect();
      const boundX = (wrapper.width * (zoom - 1)) / 2;
      const boundY = (wrapper.height * (zoom - 1)) / 2;

      return {
        x: Math.max(-boundX, Math.min(boundX, x)),
        y: Math.max(-boundY, Math.min(boundY, y))
      };
    },
    [zoom]
  );

  const updateTransform = useCallback(
    (zoom: number) => {
      if (wrapperRef.current) {
        const { x, y } = getBoundedPosition(
          positionRef.current.x,
          positionRef.current.y
        );
        wrapperRef.current.style.transform =
          zoom !== 1 ? `translate(${x}px, ${y}px) scale(${zoom})` : '';
      }
    },
    [getBoundedPosition]
  );

  const onDoubleClick = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = 'transform 0.3s ease';
    }

    const newZoom = isZooming ? 1 : 2;
    if (newZoom === 2) {
      onZoomStart?.();
    } else {
      onZoomEnd?.();
    }
    setZoom(newZoom);
    positionRef.current = { x: 0, y: 0 };
    updateTransform(newZoom);
  }, [isZooming, onZoomStart, onZoomEnd, updateTransform]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isZooming) return;
      e.preventDefault();
      setIsDragging(true);
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    },
    [isZooming]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !isZooming) return;
      e.preventDefault();

      if (wrapperRef.current) {
        wrapperRef.current.style.transition = 'none';
      }

      const deltaX = e.clientX - lastMousePositionRef.current.x;
      const deltaY = e.clientY - lastMousePositionRef.current.y;

      const newPosition = {
        x: positionRef.current.x + deltaX,
        y: positionRef.current.y + deltaY
      };

      positionRef.current = getBoundedPosition(newPosition.x, newPosition.y);
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
      updateTransform(zoom);
    },
    [updateTransform, isDragging, zoom, isZooming, getBoundedPosition]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isZooming) return;
      e.preventDefault();
      setIsDragging(false);
    },
    [isZooming]
  );

  return (
    <ZoommableImageContainer className={className}>
      <ZoommableImageWrapper
        ref={wrapperRef}
        onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <ZoommableImageStyled
          {...imageProps}
          draggable="false"
        />
      </ZoommableImageWrapper>
    </ZoommableImageContainer>
  );
};
