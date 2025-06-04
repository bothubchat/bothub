import React, { useCallback, useState } from 'react';
import {
  AccordionArrow,
  AccordionBody,
  AccordionHead,
  AccordionStyled,
  AccordionText,
  AccordionLabel
} from './styled';

export interface AccordionProps extends React.ComponentProps<'div'> {
  label: string | React.ReactNode;
  variant?: 'with-icon' | 'default';
  fullWidth?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  label,
  children,
  variant = 'default',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <AccordionStyled {...props}>
      <AccordionHead
        $isDefaultVariant={variant === 'default'}
        $isOpen={isOpen}
        onClick={toggle}
      >
        <AccordionLabel>{label}</AccordionLabel>
        <AccordionArrow $isOpen={isOpen} />
      </AccordionHead>

      <AccordionBody
        $isDefaultVariant={variant === 'default'}
        $isOpen={isOpen}
      >
        {typeof children === 'string' ? (
          <AccordionText $isOpen={isOpen}>{children}</AccordionText>
        ) : (
          children
        )}
      </AccordionBody>
    </AccordionStyled>
  );
};

export * from './styled';
