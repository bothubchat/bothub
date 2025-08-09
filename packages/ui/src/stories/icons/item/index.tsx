import React, { useCallback } from 'react';
import {
  IconComponent,
  IconProps,
  Tooltip,
  TooltipConsumer,
} from '@/ui/components';
import { IconItemStyled } from './styled';

export interface IconItemProps extends Omit<IconProps, 'children'> {
  name: string;
  children: IconComponent;
}

export const IconItem: React.FC<IconItemProps> = ({
  name,
  children,
  ...props
}) => {
  const handleClick = useCallback(() => {
    window.navigator.clipboard.writeText(name);
    alert('Copied to clipboard');
  }, [name]);

  return (
    <Tooltip label={name}>
      <TooltipConsumer>
        {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
          <IconItemStyled
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
            onClick={handleClick}
          >
            {React.createElement(children, props)}
          </IconItemStyled>
        )}
      </TooltipConsumer>
    </Tooltip>
  );
};
