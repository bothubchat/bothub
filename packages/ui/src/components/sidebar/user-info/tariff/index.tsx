import React from 'react';
import { SidebarUserInfoTariffStyled, SidebarUserInfoTariffStyledProps } from './styled';
import { useSidebarUserInfo } from '../context';

export type SidebarUserInfoTariffProps = Omit<
React.ComponentProps<typeof SidebarUserInfoTariffStyled>,
keyof SidebarUserInfoTariffStyledProps
>;

export const SidebarUserInfoTariff: React.FC<SidebarUserInfoTariffProps> = ({
  ...props
}) => {
  const { caps } = useSidebarUserInfo();

  return (
    <SidebarUserInfoTariffStyled
      $length={caps?.length ?? 0}
      {...props}
    />
  );
};
