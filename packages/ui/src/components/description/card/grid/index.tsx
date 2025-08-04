import React from 'react';
import { DescriptionCardGridStyled } from './styled';

export interface DescriptionCardGridProps extends React.PropsWithChildren {
  className?: string;
  columns?: number;
}

export const DescriptionCardGrid: React.FC<DescriptionCardGridProps> = ({
  className,
  columns = 2,
  children,
}) => (
  <DescriptionCardGridStyled
    $columns={columns}
    className={className}
  >
    {children}
  </DescriptionCardGridStyled>
);
