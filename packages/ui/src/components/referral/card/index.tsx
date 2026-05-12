import React from 'react';
import {
  ReferralCardAI,
  ReferralCardAIName,
  ReferralCardBottom,
  ReferralCardContent,
  ReferralCardDateCreated,
  ReferralCardInfo,
  ReferralCardMain,
  ReferralCardName,
  ReferralCardPrice,
  ReferralCardPriceProgress,
  ReferralCardPriceRange,
  ReferralCardPriceRangeText,
  ReferralCardStyled,
  ReferralCardTop,
  ReferralRewardName,
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface ReferralCardPriceProps {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  fullWidth?: boolean;
  skeleton?: boolean;
  minText: string;
  maxText: string;
}

export interface ReferralCardCapsRewardProps {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  rewardText: string;
  fullWidth?: boolean;
  skeleton?: boolean;
  maxText: string;
}

export interface ReferralCardDefaultProps {
  name: string;
  aiName?: string;
  price?: ReferralCardPriceProps;
  capsReward?: ReferralCardCapsRewardProps;
  dateCreated: string;
  skeleton?: false;
}

export interface ReferralCardSkeletonProps {
  skeleton: true;
}

export type ReferralCardProps = (
  | ReferralCardDefaultProps
  | ReferralCardSkeletonProps
) & {
  className?: string;
  withdraw: React.ReactNode;
} & React.PropsWithChildren;

export const ReferralCard: React.FC<ReferralCardProps> = ({
  className,
  withdraw,
  children,
  ...props
}) => (
  <ReferralCardStyled className={className}>
    <ReferralCardContent>
      <ReferralCardTop>
        <ReferralCardMain>
          {!props.skeleton && props.aiName && (
            <ReferralCardAI>
              <ReferralCardAIName>{props.aiName}</ReferralCardAIName>
            </ReferralCardAI>
          )}
          <ReferralCardInfo>
            <ReferralCardName>
              {!props.skeleton && props.name}
              {props.skeleton && <Skeleton width={265} />}
            </ReferralCardName>
            {!props.skeleton && props.price && (
              <ReferralCardPrice>
                <ReferralCardPriceProgress {...props.price} />
                <ReferralCardPriceRange>
                  <ReferralCardPriceRangeText>
                    {props.price.minText}
                  </ReferralCardPriceRangeText>
                  <ReferralCardPriceRangeText>
                    {props.price.maxText}
                  </ReferralCardPriceRangeText>
                </ReferralCardPriceRange>
              </ReferralCardPrice>
            )}

            {!props.skeleton && props.capsReward && (
              <ReferralCardPrice>
                <ReferralRewardName>
                  {props.capsReward.rewardText}
                </ReferralRewardName>
                <ReferralCardPriceProgress {...props.capsReward} />
                <ReferralCardPriceRange>
                  <ReferralCardPriceRangeText>
                    {props.capsReward.maxText}
                  </ReferralCardPriceRangeText>
                </ReferralCardPriceRange>
              </ReferralCardPrice>
            )}

            {props.skeleton && (
              <ReferralCardPrice>
                <ReferralCardPriceProgress skeleton />
                <ReferralCardPriceRange>
                  <ReferralCardPriceRangeText>
                    <Skeleton width={60} />
                  </ReferralCardPriceRangeText>
                  <ReferralCardPriceRangeText>
                    <Skeleton width={60} />
                  </ReferralCardPriceRangeText>
                </ReferralCardPriceRange>
              </ReferralCardPrice>
            )}
          </ReferralCardInfo>
        </ReferralCardMain>
        {children}
      </ReferralCardTop>
      {props.skeleton && (
        <ReferralCardBottom>
          <Skeleton width={330} />
        </ReferralCardBottom>
      )}
      {!props.skeleton && props.price && (
        <ReferralCardBottom>
          {withdraw}
          <ReferralCardDateCreated>{props.dateCreated}</ReferralCardDateCreated>
        </ReferralCardBottom>
      )}
    </ReferralCardContent>
  </ReferralCardStyled>
);

export * from './styled';
export * from './link';
