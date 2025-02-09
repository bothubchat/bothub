import React from 'react';
import {
  TariffCardModelList,
  TariffCardModelsLabel,
  TariffCardModelsStyled
} from './styled';

export interface TariffCardModelsProps extends React.PropsWithChildren {
  label?: string;
}

export const TariffCardModels: React.FC<TariffCardModelsProps> = ({
  label,
  children
}) => (
  <TariffCardModelsStyled>
    {label && <TariffCardModelsLabel>{label}</TariffCardModelsLabel>}
    <TariffCardModelList>{children}</TariffCardModelList>
  </TariffCardModelsStyled>
);
