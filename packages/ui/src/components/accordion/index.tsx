import React, { useCallback, useState } from 'react';
import {
  AccordionArrow, AccordionBody, AccordionHead, AccordionStyled, AccordionText, AccordionLabel 
} from './styled';

export interface AccordionProps extends React.ComponentProps<'div'> {
  label: string;
}

export const Accordion: React.FC<AccordionProps> = ({ label, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <AccordionStyled
      {...props}
      $isOpen={isOpen}
    >
      <AccordionHead onClick={toggle}>
        <AccordionLabel>
          {label}
        </AccordionLabel>
        <AccordionArrow
          animate={{
            transform: `rotateZ(${isOpen ? 180 : 0}deg)`
          }}
        />
      </AccordionHead>
      {isOpen && (
        <AccordionBody>
          {typeof children === 'string' && (
            <AccordionText>
              {children}
            </AccordionText>
          )}
          {typeof children !== 'string' && children}
        </AccordionBody>
      )}
    </AccordionStyled>
  );
};

export * from './styled';
