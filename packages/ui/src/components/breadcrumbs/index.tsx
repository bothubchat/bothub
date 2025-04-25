import React from 'react';
import { BreadcrumbsContainer, BreadcrumbsSeparator } from './styled';

export const Breadcrumbs: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <BreadcrumbsContainer>
    {React.Children.map(children, (child, index) => (
      <>
        <React.Fragment key={index}>{child}</React.Fragment>
        {index !== React.Children.count(children) - 1 && (
          <BreadcrumbsSeparator key={`separator-${index}`} />
        )}
      </>
    ))}
  </BreadcrumbsContainer>
);

export { BreadcrumbsItem } from './styled';
