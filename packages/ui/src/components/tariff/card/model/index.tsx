import React from 'react';
import {
  TariffCardModelIcon,
  TariffCardModelInfo,
  TariffCardModelName,
  TariffCardModelStyled,
  TariffCardModelTokens
} from './styled';
import { IconProvider } from '@/ui/components/icon';

export interface TariffCardModelProps {
  name: string;
  tokens: string;
}

export const TariffCardModel: React.FC<TariffCardModelProps> = ({
  name,
  tokens
}) => (
  <TariffCardModelStyled>
    <IconProvider size={18}>
      <TariffCardModelIcon />
    </IconProvider>
    <TariffCardModelInfo>
      <TariffCardModelName>{name}</TariffCardModelName>
      <TariffCardModelTokens>{tokens}</TariffCardModelTokens>
    </TariffCardModelInfo>
  </TariffCardModelStyled>
);

export * from './list';
