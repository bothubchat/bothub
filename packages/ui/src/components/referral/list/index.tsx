import React from 'react';
import { ReferralList, ReferralsButtons, ReferralsStyled } from './styled';

export interface ReferralsProps extends React.PropsWithChildren {
  className?: string;
  create?: React.ReactNode;
  empty?: React.ReactNode;
}

export const Referrals: React.FC<ReferralsProps> = ({
  className, create, empty, children
}) => (
  <ReferralsStyled
    className={className}
  >
    {React.Children.toArray(children).length === 0 && empty}
    {React.Children.toArray(children).length !== 0 && (
      <ReferralList>
        {children}
      </ReferralList>
    )}
    <ReferralsButtons>
      {create}
    </ReferralsButtons>
  </ReferralsStyled>
);

export * from './styled';
