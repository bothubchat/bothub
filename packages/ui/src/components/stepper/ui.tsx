import React, { memo } from 'react';
import { Typography } from '../typography';
import { StepperLine, StepperStepPoint, StepperStyled } from './styled';
import { CheckSmallIcon } from '@/ui/icons/check-small';

export interface StepperProps {
  activeStep: number;
  stepLabels: React.ReactNode[];
  className?: string;
}

export const Stepper = memo((props: StepperProps) => (
  <StepperStyled className={props.className}>
    {props.stepLabels.map((label, index) => (
      <React.Fragment key={index}>
        <Typography variant="body-xxl-semibold">{label}</Typography>
        <StepperStepPoint $status={getStatus(props.activeStep, index)}>
          <CheckSmallIcon />
        </StepperStepPoint>

        {index < props.stepLabels.length - 1 && (
          <StepperLine $status={getStatus(props.activeStep, index)} />
        )}
      </React.Fragment>
    ))}
  </StepperStyled>
));

const getStatus = (activeStep: number, index: number) => {
  if (activeStep === index) {
    return 'active';
  }

  if (activeStep > index) {
    return 'complete';
  }

  return 'incomplete';
};
