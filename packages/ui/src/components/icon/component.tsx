import React from 'react';
import { IconProps } from '.';

export type IconComponent = React.FC<IconProps> & {
  bothubType?: 'Icon';
};

export function icon<Component extends React.FC>(
  component: Component
): IconComponent {
  (component as IconComponent).bothubType = 'Icon';

  return component;
}

// eslint-disable-next-line
export function isIconComponent(component: any): boolean {
  return typeof component === 'function' && component.bothubType === 'Icon';
}
