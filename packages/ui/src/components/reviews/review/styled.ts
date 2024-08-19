import { styled } from 'styled-components';

import { ArrowNarrowRightIcon, StarIcon } from '@/ui/icons';

import { Container, Typography, Avatar, Button } from '@/ui/components';

export const ReviewsSectionTitle = styled(Typography).attrs({
  variant: 'h2',
})`
  text-align: center;
`;

export const ReviewsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  padding-bottom: 86px;
`;

export const ReviewsSection = styled(Container)`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    justify-content: start;

    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ReviewsSectionReview = styled.div`
  min-width: 300px;
  max-width: 300px;
  min-height: 202px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border-radius: 12px !important;
  background: radial-gradient(circle at 0 -500%, #103fe7c4 1%, #121825 100%);

  scroll-snap-align: start;

  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    width: 300px;
    height: 178px;
  }
`;

export const ReviewsSectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const ReviewsSectionReviewer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ReviewsSectionReviewerAvatar = styled(Avatar).attrs({
  variant: 'user',
  size: 28,
})``;

export const ReviewsSectionReviewerName = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ReviewsSectionStar = styled(StarIcon)``;

export const ReviewsSectionStars = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

export const ReviewsSectionTextWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  color: white;
`;

export const ReviewsSectionText = styled(Typography).attrs({
  variant: 'body-m-regular',
})`
  overflow-wrap: break-word;
`;

export const ReviewsSectionArrow = styled(ArrowNarrowRightIcon)``;

export const ReviewsSectionButton = styled(Button).attrs({
  size: 'small',
  variant: 'primary',
  component: 'a',
  iconSize: 18,
  iconFill: 'white',
  corner: 'brick',
})`
  user-select: none;
`;
