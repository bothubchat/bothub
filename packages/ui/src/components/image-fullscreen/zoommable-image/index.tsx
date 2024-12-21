import React, { useCallback, useState, useRef } from 'react';
import { ZoommableImageContainer, ZoommableImageStyled } from './styled';

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
  onZoomEnd,
}: ZoommableImageProps) => {
  const [zoom, setZoom] = useState(1);
  const isZooming = zoom !== 1;

  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const getBoundedPosition = useCallback(
    (x: number, y: number) => {
      if (!imageRef.current) return { x, y };

      const image = imageRef.current.getBoundingClientRect();

      x = Math.min(x, image.width * 0.25);
      y = Math.min(y, image.height * 0.5);

      return {
        x: Math.max(-image.width * 0.25, x),
        y: Math.max(-image.height * 0.5, y),
      };
    },
    [zoom]
  );

  const updateImageTransform = useCallback((zoom: number) => {
    if (imageRef.current) {
      const { x, y } = getBoundedPosition(positionRef.current.x, positionRef.current.y);
      imageRef.current.style.transform = zoom !== 1 ? `translate(${x}px, ${y}px) scale(${zoom})` : '';
    }
  }, [getBoundedPosition]);

  const onDoubleClick = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.style.transition = 'transform 0.3s ease';
    }

    const newZoom = isZooming ? 1 : 2;
    if (newZoom === 2) {
      onZoomStart?.();
    } else {
      onZoomEnd?.();
    }
    setZoom(newZoom);
    positionRef.current = { x: 0, y: 0 };
    updateImageTransform(newZoom);
  }, [isZooming, onZoomStart, onZoomEnd, updateImageTransform]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !imageRef.current) return;
      imageRef.current.style.transition = 'none';

      const deltaX = e.clientX - lastMousePositionRef.current.x;
      const deltaY = e.clientY - lastMousePositionRef.current.y;

      const newPosition = {
        x: positionRef.current.x + deltaX,
        y: positionRef.current.y + deltaY,
      };

      // Apply bounded position
      positionRef.current = getBoundedPosition(newPosition.x, newPosition.y);
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
      updateImageTransform(zoom);
    },
    [updateImageTransform, isDragging, zoom, getBoundedPosition]
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <ZoommableImageContainer
      className={className}
      onDoubleClick={onDoubleClick}
      onPointerDown={isZooming ? onPointerDown : undefined}
      onPointerMove={isZooming ? onPointerMove : undefined}
      onPointerUp={isZooming ? onPointerUp : undefined}
      onPointerLeave={isZooming ? onPointerUp : undefined}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <ZoommableImageStyled ref={imageRef} {...imageProps} draggable="false" />
    </ZoommableImageContainer>
  );
};
