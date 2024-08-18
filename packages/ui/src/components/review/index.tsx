import {
  ReviewsSectionReview,
  ReviewsSectionHeader,
  ReviewsSectionReviewerName,
  ReviewsSectionReviewerAvatar,
  ReviewsSectionReviewer,
  ReviewsSectionStars,
  ReviewsSectionStar,
  ReviewsSectionText,
  ReviewsSectionTextWrapper,
} from './styled';

const Review = ({
  src,
  alt,
  reviewer,
  review,
}: {
  src: string;
  alt: string;
  reviewer: string;
  review: string;
}) => (
  <ReviewsSectionReview>
    <ReviewsSectionHeader>
      <ReviewsSectionReviewer>
        <ReviewsSectionReviewerAvatar src={src} alt={alt} />
        <ReviewsSectionReviewerName>{reviewer}</ReviewsSectionReviewerName>
      </ReviewsSectionReviewer>
      <ReviewsSectionStars>
        <ReviewsSectionStar />
        <ReviewsSectionStar />
        <ReviewsSectionStar />
        <ReviewsSectionStar />
        <ReviewsSectionStar />
      </ReviewsSectionStars>
    </ReviewsSectionHeader>
    <ReviewsSectionTextWrapper>
      <ReviewsSectionText>{review}</ReviewsSectionText>
    </ReviewsSectionTextWrapper>
  </ReviewsSectionReview>
);

export default Review;
