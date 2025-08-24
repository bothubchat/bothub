import { styled } from 'styled-components';
import { StatusProps } from './types';
import { Typography } from '../typography';
import { CheckSmallIcon } from '@/ui/icons';

export const StepperStyled = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  --transition-duration: 0.5s;
  --transition-delay: 0.25s;
  --transition-function: cubic-bezier(0.25, 0.46, 0.45, 1);
  position: relative;
`;

export const StepperStepPoint = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  background-color: ${({ theme, $status }) =>
    $status === 'complete' || $status === 'active'
      ? theme.colors.accent.primary
      : theme.colors.grayScale.gray1};
  transition: var(--transition-duration) background-color
    var(--transition-function);
  transition-delay: ${({ $status }) =>
    $status === 'complete' || $status === 'incomplete'
      ? '0s'
      : 'var(--transition-delay)'};
`;

export const StepperStepPointValue = styled(Typography).attrs<StatusProps>({
  variant: 'body-l-semibold',
})`
  color: ${({ theme, $status }) =>
    $status === 'incomplete'
      ? theme.colors.grayScale.gray3
      : theme.colors.base.white};
`;

export const CheckIconContainer = styled.div<StatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accent.primary};
  transition: opacity var(--transition-duration) var(--transition-function);
  transition-delay: ${({ $status }) =>
    $status === 'complete' || $status === 'incomplete'
      ? '0s'
      : 'var(--transition-delay)'};
  opacity: ${({ $status }) => ($status === 'complete' ? 1 : 0)};
`;

export const CheckIcon = styled(CheckSmallIcon).attrs({
  size: 24,
})`
  margin: 0 -2px -2px 0;
`;

export const StepperLine = styled.div<StatusProps>`
  width: 100%;
  height: 3px;
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
        return '25%';
      case 'incomplete':
        return '100%';
    }
  }};
  background-position-y: 50%;
  transition: background-position-x var(--transition-duration)
    var(--transition-function);
  margin-left: -5px;
  margin-right: -5px;
  z-index: 0;
`;
