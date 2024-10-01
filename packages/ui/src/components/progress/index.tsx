import React from 'react';
import { ProgressLine, ProgressLineFilled, ProgressStyled } from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface ProgressProps {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  fullWidth?: boolean;
  skeleton?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({ 
  className, value = 50, min = 0, max = 100, fullWidth = false, skeleton = false
}) => {
  const range: number = max - min;
  const percent: number = ((value - min) / range) * 100;

  return (
    <ProgressStyled
      $fullWidth={fullWidth}
      className={className}
    >
      {!skeleton && (
        <ProgressLine
          $skeleton={false}
        >
          <ProgressLineFilled 
            style={{ width: `${percent}%` }}
          />
        </ProgressLine>
      )}
      {skeleton && (
        <ProgressLine 
          $skeleton
          as={skeleton ? Skeleton : 'div'}
        />
      )}
    </ProgressStyled>
  );
};
