import React, { useCallback, useState } from 'react';
import {
  AccordionArrow, AccordionBody, AccordionHead, AccordionStyled, AccordionText, AccordionLabel 
} from './styled';
import { useTheme } from '../../theme';

export interface AccordionProps extends React.ComponentProps<'div'> {
  label: string;
}

export const Accordion: React.FC<AccordionProps> = ({ label, children, ...props }) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <AccordionStyled
      {...props}
      initial={{
        background: theme.colors.grayScale.gray2
      }}
      animate={{
        background: isOpen ? theme.colors.accent.primary : theme.colors.grayScale.gray2
      }}
      whileHover={{
        background: theme.colors.accent.primary
      }}
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
