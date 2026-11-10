import React, { useCallback, useId, useState } from 'react';
import {
  AccordionArrow,
  AccordionBody,
  AccordionBodyContent,
  AccordionHead,
  AccordionStyled,
  AccordionText,
  AccordionLabel,
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
  // The accordion is always full width; don't pass the prop to the DOM
  fullWidth: _,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const bodyId = useId();

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <AccordionStyled {...props}>
      <AccordionHead
        $isDefaultVariant={variant === 'default'}
        $isOpen={isOpen}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <AccordionLabel>{label}</AccordionLabel>
        <AccordionArrow $isOpen={isOpen} />
      </AccordionHead>

      <AccordionBody
        id={bodyId}
        $isDefaultVariant={variant === 'default'}
        $isOpen={isOpen}
        inert={!isOpen}
      >
        <AccordionBodyContent $isOpen={isOpen}>
          {typeof children === 'string' ? (
            <AccordionText $isOpen={isOpen}>{children}</AccordionText>
          ) : (
            children
          )}
        </AccordionBodyContent>
      </AccordionBody>
    </AccordionStyled>
  );
};

export * from './styled';
