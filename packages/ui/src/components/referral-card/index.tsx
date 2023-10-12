import React from 'react';
import { ProgressProps } from '@/ui/components/progress';
import {
  ReferralCardAI, 
  ReferralCardAIName, 
  ReferralCardBottom, 
  ReferralCardContent, 
  ReferralCardDateCreated, 
  ReferralCardInfo, 
  ReferralCardName, 
  ReferralCardPrice,
  ReferralCardPriceProgress, 
  ReferralCardPriceRange, 
  ReferralCardPriceRangeText, 
  ReferralCardStyled,
  ReferralCardTop 
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface ReferralCardPriceProps extends ProgressProps {
  minText: string;
  maxText: string;
}

export interface ReferralCardDefaultProps {
  name: string;
  aiName?: string;
  price: ReferralCardPriceProps;
  dateCreated: string;
  skeleton?: false;
}

export interface ReferralCardSkeletonProps {
  skeleton: true;
}

export type ReferralCardProps = (ReferralCardDefaultProps | ReferralCardSkeletonProps) & {
  className?: string;
  withdraw: React.ReactNode;
} & React.PropsWithChildren;

export const ReferralCard: React.FC<ReferralCardProps> = ({
  className, withdraw, children, ...props
}) => (
  <ReferralCardStyled
    className={className}
  >
    <ReferralCardContent>
      <ReferralCardTop>
        {(!props.skeleton && props.aiName) && (
          <ReferralCardAI>
            <ReferralCardAIName>
              {props.aiName}
            </ReferralCardAIName>
          </ReferralCardAI>
        )}
        <ReferralCardInfo>
          <ReferralCardName>
            {!props.skeleton && props.name}
            {props.skeleton && (
              <Skeleton width={265} />
            )}
          </ReferralCardName>
          <ReferralCardPrice>
            {!props.skeleton && (
              <ReferralCardPriceProgress
                {...props.price}
              />
            )}
            {props.skeleton && (
              <ReferralCardPriceProgress skeleton />
            )}
            <ReferralCardPriceRange>
              <ReferralCardPriceRangeText>
                {!props.skeleton && props.price.minText}
                {props.skeleton && (
                  <Skeleton width={60} />
                )}
              </ReferralCardPriceRangeText>
              <ReferralCardPriceRangeText>
                {!props.skeleton && props.price.maxText}
                {props.skeleton && (
                  <Skeleton width={60} />
                )}
              </ReferralCardPriceRangeText>
            </ReferralCardPriceRange>
          </ReferralCardPrice>
        </ReferralCardInfo>
        {children}
      </ReferralCardTop>
      <ReferralCardBottom>
        {withdraw}
        <ReferralCardDateCreated>
          {!props.skeleton && props.dateCreated}
          {props.skeleton && (
            <Skeleton width={350} />
          )}
        </ReferralCardDateCreated>
      </ReferralCardBottom>
    </ReferralCardContent>
  </ReferralCardStyled>
);

export * from './styled';
export * from './link';
