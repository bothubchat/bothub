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
  SearchResultsItemDownload,
} from './styled';
import { MessageMarkdown } from '../markdown';
import { markdownComponents } from '../reasoning-block/markdown-components';
import { useMeasure } from '@/ui/utils';
import { DownloadImgIcon } from '@/ui/icons';
import { Tooltip, TooltipConsumer } from '../../tooltip';

export type MessageSearchResultsItemType = {
  url: string;
  name: string;
  title: string;
  date: string;
  content: string;
};

export type MessageSearchResultsProps = {
  results: MessageSearchResultsItemType[];
  downloadHandler?: (
    result: MessageSearchResultsItemType,
    index: number,
  ) => void;
  regexFilterDownloadHandler: RegExp;
  downloadText?: string;
};

export const MessageSearchResults: React.FC<MessageSearchResultsProps> = ({
  downloadHandler,
  downloadText,
  regexFilterDownloadHandler,
  ...props
}) => (
  <SearchResultsList>
    {props.results.map((result, index) => (
      <MessageSearchResultsItem
        result={result}
        index={index}
        key={index}
        downloadText={downloadText}
        {...(regexFilterDownloadHandler.test(result.url) && {
          downloadHandler: () => downloadHandler?.(result, index),
        })}
      />
    ))}
  </SearchResultsList>
);

const MessageSearchResultsItem = memo(
  ({
    result,
    index,
    downloadHandler,
    downloadText,
  }: {
    result: MessageSearchResultsItemType;
    index: number;
    downloadHandler?: () => void;
    downloadText?: string;
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
          {downloadHandler && (
            <Tooltip label={downloadText}>
              <TooltipConsumer>
                {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                  <SearchResultsItemDownload
                    onClick={downloadHandler}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                  >
                    <DownloadImgIcon />
                  </SearchResultsItemDownload>
                )}
              </TooltipConsumer>
            </Tooltip>
          )}
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
