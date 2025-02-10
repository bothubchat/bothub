import { memo } from 'react';
import { AnalyzeUrlsIcon } from '@/ui/icons';
import { Typography } from '../../typography';
import {
  SearchResultsItem,
  SearchResultsItemHeader,
  SearchResultsItemLink,
  SearchResultsItemName,
  SearchResultsItemNumber,
  SearchResultsItemTitle,
  SearchResultsList
} from './styled';
import { MessageMarkdown } from '../markdown';
import { markdownComponents } from '../reasoning-block/markdown-components';

export type MessageSearchResultsProps = {
  results: {
    url: string;
    name: string;
    title: string;
    date: string;
    content: string;
  }[];
};

export const MessageSearchResults = (props: MessageSearchResultsProps) => (
  <SearchResultsList>
    {props.results.map((result, index) => (
      <SearchResultsItem>
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

        <div data-source-content>
          <MessageMarkdown componentsOverride={markdownComponents()}>
            {result.content ?? ''}
          </MessageMarkdown>
        </div>
      </SearchResultsItem>
    ))}
  </SearchResultsList>
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
