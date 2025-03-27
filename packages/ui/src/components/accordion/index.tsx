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
  label: string;
  fullWidth?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  label,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <AccordionStyled {...props}>
      <AccordionHead
        $isOpen={isOpen}
        onClick={toggle}
      >
        <AccordionLabel>{label}</AccordionLabel>
        <AccordionArrow $isOpen={isOpen} />
      </AccordionHead>

      <AccordionBody $isOpen={isOpen}>
        {typeof children === 'string' ? (
          <AccordionText>{children}</AccordionText>
        ) : (
          children
        )}
      </AccordionBody>
    </AccordionStyled>
  );
};

export * from './styled';
