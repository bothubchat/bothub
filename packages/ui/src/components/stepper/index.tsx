import React, { memo } from 'react';
import * as S from './styled';

export interface StepperProps {
  activeStep: number;
  stepLabels: (string | number)[];
  className?: string;
}

export const Stepper = memo((props: StepperProps) => (
  <S.StepperStyled className={props.className}>
    {props.stepLabels.map((label, index) => {
      const status = getStatus(props.activeStep, index);

      return (
        <React.Fragment key={index}>
          <S.StepperStepPoint $status={status}>
            <S.StepperStepPointValue $status={status}>
              {label}
            </S.StepperStepPointValue>

            <S.CheckIconContainer $status={status}>
              <S.CheckIcon />
            </S.CheckIconContainer>
          </S.StepperStepPoint>

          {index < props.stepLabels.length - 1 && (
            <S.StepperLine $status={status} />
          )}
        </React.Fragment>
      );
    })}
  </S.StepperStyled>
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
