import React from 'react';
import {
  ReferralRadioBody,
  ReferralRadioContent,
  ReferralRadioHead,
  ReferralRadioName,
  ReferralRadioRadio,
  ReferralRadioStyled
} from './styled';
import { RadioProps } from '@/ui/components/radio';
import { Skeleton } from '@/ui/components/skeleton';

export interface ReferralRadioDefaultProps
  extends Omit<RadioProps, 'label' | 'ref'> {
  name: string;
  inputName?: string;
  skeleton?: false;
}

export interface ReferralRadioSkeletonProps {
  skeleton: true;
}

export type ReferralRadioProps = (
  | ReferralRadioDefaultProps
  | ReferralRadioSkeletonProps
) &
  React.PropsWithChildren;

export const ReferralRadio: React.FC<ReferralRadioProps> = ({
  children,
  ...props
}) => {
  const isChecked = (!props.skeleton ? props.checked : false) ?? false;
  const isSkeleton = props.skeleton ?? false;

  return (
    <ReferralRadioStyled
      $checked={isChecked}
      $skeleton={isSkeleton}
    >
      <ReferralRadioContent
        $checked={isChecked}
        $skeleton={isSkeleton}
      >
        <ReferralRadioHead>
          <ReferralRadioName>
            {!props.skeleton && props.name}
            {props.skeleton && <Skeleton width={300} />}
          </ReferralRadioName>
          {!props.skeleton && (
            <ReferralRadioRadio
              {...props}
              name={props.inputName}
            >
              {null}
            </ReferralRadioRadio>
          )}
          {props.skeleton && <ReferralRadioRadio skeleton />}
        </ReferralRadioHead>
        <ReferralRadioBody>{children}</ReferralRadioBody>
      </ReferralRadioContent>
    </ReferralRadioStyled>
  );
};

export * from './styled';
