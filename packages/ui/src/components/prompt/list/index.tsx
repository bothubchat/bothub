import React from 'react';
import { PromptList, PromptsLabel, PromptsStyled } from './styled';

export interface PromptsProps extends React.PropsWithChildren {
  className?: string;
  label?: string;
}

export const Prompts: React.FC<PromptsProps> = ({
  className,
  label,
  children
}) => (
  <PromptsStyled className={className}>
    {label && <PromptsLabel>{label}</PromptsLabel>}
    <PromptList>{children}</PromptList>
  </PromptsStyled>
);
