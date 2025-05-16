import React, { PropsWithChildren } from 'react';
import { TariffListStyled } from './styled';

type TariffListProps = PropsWithChildren;

export const TariffList: React.FC<TariffListProps> = ({ children }) => (
  <TariffListStyled>{children}</TariffListStyled>
);
