import { memo } from 'react';
import { AnalyzeUrlsIcon } from '@/ui/icons/analyze-urls';
import { Typography } from '../../typography';
import {
  SearchResultsItemStyled,
  SearchResultsItemContent,
  SearchResultsItemHeader,
  SearchResultsItemLink,
  SearchResultsItemName,
  SearchResultsItemNumber,
  SearchResultsItemTitle,
  SearchResultsList,
} from './styled';
import { MessageMarkdown } from '../markdown';
import { markdownComponents } from '../reasoning-block/markdown-components';
import { useMeasure } from '@/ui/utils';

export type MessageSearchResultsItemType = {
  url: string;
  name: string;
  title: string;
  date: string;
  content: string;
};

export type MessageSearchResultsProps = {
  results: MessageSearchResultsItemType[];
};

export const MessageSearchResults = (props: MessageSearchResultsProps) => (
  <SearchResultsList>
    {props.results.map((result, index) => (
      <MessageSearchResultsItem
        result={result}
        index={index}
        key={index}
      />
    ))}
  </SearchResultsList>
);

const MessageSearchResultsItem = memo(
  ({
    result,
    index,
  }: {
    result: MessageSearchResultsItemType;
    index: number;
  }) => {
    const [wrapperRef, wrapperDimensions] = useMeasure<HTMLDivElement>();
    const [contentRef, contentDimensions] = useMeasure<HTMLDivElement>();

    const hasOverflow =
      contentDimensions.height > wrapperDimensions.height &&
      contentDimensions.height !== 0 &&
      wrapperDimensions.height !== 0;

    return (
      <SearchResultsItemStyled>
        <SearchResultsItemLink
          target="_blank"
          href={result.url}
          rel="noreferrer"
        />

        <SearchResultsItemHeader>
          <AnalyzeUrlsIcon size={18} />

          <SearchResultsItemName
            component="span"
            variant="body-m-medium"
            data-source-name
          >
            {result.name}
          </SearchResultsItemName>

          <SearchResultsItemDate date={result.date} />

          <SearchResultsItemNumber>
            <Typography
              data-source-number={index + 1}
              variant="body-m-medium"
            >
              {index + 1}
            </Typography>
          </SearchResultsItemNumber>
        </SearchResultsItemHeader>

        <SearchResultsItemTitle
          data-source-title
          component="p"
          variant="body-l-semibold"
        >
          {result.title}
        </SearchResultsItemTitle>

        <SearchResultsItemContent
          data-source-content
          ref={wrapperRef}
          data-has-overflow={hasOverflow}
        >
          <MessageMarkdown
            componentsOverride={markdownComponents()}
            disableTyping
            ref={contentRef}
          >
            {result.content ?? ''}
          </MessageMarkdown>
        </SearchResultsItemContent>
      </SearchResultsItemStyled>
    );
  },
);

const SearchResultsItemDate = memo(({ date }: { date: string }) => {
  const dateObject = new Date(date);
  const utcDay = dateObject.getUTCDate(); // 10
  const utcMonth = dateObject.getUTCMonth() + 1; // 2
  const utcYear = dateObject.getUTCFullYear(); // 2025

  return (
    <Typography variant="body-s-regular">
      <span>{utcDay.toString().padStart(2, '0')}</span>/
      <span>{utcMonth.toString().padStart(2, '0')}</span>/<span>{utcYear}</span>
    </Typography>
  );
});
