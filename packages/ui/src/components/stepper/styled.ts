import styled from 'styled-components';
import { StepStatus } from './types';

export const StepperStyled = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  --transition-duration: 0.5s;
  --transition-delay: 0.25s;
  --transition-function: cubic-bezier(0.25, 0.46, 0.45, 1);
`;

export type StepperStepProps = {
  $status: StepStatus;
};

export const StepperStep = styled.div<StepperStepProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;

  & > span {
    color: ${({ theme, $status }) => ($status === 'active' || $status === 'complete' ? theme.colors.base.white : theme.colors.grayScale.gray1)};
    transition: color var(--transition-duration) var(--transition-function);
    transition-delay: ${({ $status }) => ($status === 'complete' || $status === 'incomplete' ? '0s' : 'var(--transition-delay)')};
  }
`;

export type StepperStepPointProps = {
  $status: StepStatus;
};

export const StepperStepPoint = styled.div<StepperStepPointProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme, $status }) => (
    $status === 'complete' || $status === 'active'
      ? theme.colors.accent.primary 
      : theme.colors.grayScale.gray1
  )};
  transition: var(--transition-duration) background-color var(--transition-function);
  transition-delay: ${({ $status }) => (
    $status === 'complete' || $status === 'incomplete' 
      ? '0s' 
      : 'var(--transition-delay)'
  )};

  & > * {
    transition: opacity var(--transition-duration) var(--transition-function);
    transition-delay: ${({ $status }) => (
    $status === 'complete' || $status === 'incomplete' ? '0s' : 'var(--transition-delay)')};
    opacity: ${({ $status }) => ($status === 'complete' ? 1 : 0)};
  }
`;

export type StepperLineProps = {
  $status: StepStatus;
};

export const StepperLine = styled.div<StepperLineProps>`
  width: 100%;
  height: 4px;
  background-size: 300% 100%;
  background-image: ${({ theme }) => `linear-gradient(to right, 
                  ${theme.colors.accent.primary} 0%, 
                  ${theme.colors.accent.primary} 25%,
                  ${theme.colors.grayScale.gray1} 50%,
                  ${theme.colors.grayScale.gray1} 100%)`};
  background-repeat: no-repeat;
  background-position-x: ${({ $status }) => {
    switch ($status) {
      case 'complete':
        return '0%';
      case 'active':
        return '50%';
      case 'incomplete':
        return '100%';
    }
  }};
  background-position-y: 50%;
  transition: background-position-x var(--transition-duration) var(--transition-function);
  margin-left: -6px;
  margin-right: -6px;  
  margin-bottom: 10px;  
`;
