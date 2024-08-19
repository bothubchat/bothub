import { useState } from 'react';

type UseStepper = (args: {
  defaultActiveStep?: number;
  steps: React.ReactNode[];
}) => {
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  nextStep: () => void;
  prevStep: () => void;
  activeNode: React.ReactNode;
};

export const useStepper: UseStepper = (args) => {
  const [activeStep, setActiveStep] = useState(args.defaultActiveStep || 0);

  const hasNextStep = activeStep < args.steps.length - 1;
  const hasPrevStep = activeStep > 0;

  const nextStep = () => {
    if (hasNextStep) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (hasPrevStep) {
      setActiveStep(activeStep - 1);
    }
  };

  return { 
    activeStep, 
    setActiveStep: (activeStep: number) => {
      if (activeStep >= 0 && activeStep < args.steps.length) {
        setActiveStep(activeStep);
      }
    },
    hasNextStep,
    hasPrevStep,
    nextStep, 
    prevStep,
    activeNode: args.steps[activeStep],
  };
};
