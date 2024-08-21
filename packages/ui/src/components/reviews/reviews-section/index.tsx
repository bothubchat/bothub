import {
  ReviewsSectionButton,
  ReviewsSection,
  ReviewsSectionTitle,
  ReviewsSectionWrapper,
} from './styled';

import { Review } from '../review';

export type ReviewType = {
  src: string;
  alt: string;
  reviewer: string;
  review: string;
};

export type ReviewsProps = {
  sectionTitle: string;
  reviews: ReviewType[];
  buttonProps: {
    label: string;
    endIcon: React.ReactNode;
    onClick?: () => void;
  };
};

export const Reviews: React.FC<ReviewsProps> = ({
  sectionTitle,
  reviews,
  buttonProps,
}: ReviewsProps) => (
  <ReviewsSectionWrapper>
    <ReviewsSectionTitle>{sectionTitle}</ReviewsSectionTitle>
    <ReviewsSection>
      {reviews.map((review, idx) => (
        <Review
          key={`review-${idx}`}
          src={review.src}
          alt={review.alt}
          reviewer={review.reviewer}
          review={review.review}
        />
      ))}
    </ReviewsSection>
    <ReviewsSectionButton
      endIcon={buttonProps.endIcon}
      onClick={buttonProps.onClick}
      iconFill="white"
    >
      {buttonProps.label}
    </ReviewsSectionButton>
  </ReviewsSectionWrapper>
);

export * from './styled';
