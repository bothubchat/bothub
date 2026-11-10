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
import { useEventCallback, useMeasure } from '@/ui/utils';
import { DownloadImgIcon } from '@/ui/icons';
import { Tooltip, TooltipConsumer } from '../../tooltip';
import { reasoningComponentsOverride } from '../reasoning-block/markdown-components';

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
  regexFilterDownloadHandler?: RegExp;
  downloadText?: string;
  pendingMessage: boolean;
};

// search() ignores lastIndex, so a regex with the g flag matches every url.
const isDownloadable = (url: string, regex?: RegExp) =>
  !!regex && url.search(regex) !== -1;

export const MessageSearchResults: React.FC<MessageSearchResultsProps> = ({
  downloadHandler,
  downloadText,
  regexFilterDownloadHandler,
  pendingMessage,
  ...props
}) => {
  // A stable handler keeps the memoized items from rerendering.
  const handleDownload = useEventCallback(
    (result: MessageSearchResultsItemType, index: number) =>
      downloadHandler?.(result, index),
  );
  const urlCounts = new Map<string, number>();

  return (
    <SearchResultsList>
      {props.results.map((result, index) => {
        // The url keeps the key stable; repeated urls get a counter.
        const urlCount = urlCounts.get(result.url) ?? 0;
        urlCounts.set(result.url, urlCount + 1);

        return (
          <MessageSearchResultsItem
            result={result}
            index={index}
            key={urlCount ? `${result.url}#${urlCount}` : result.url}
            pendingMessage={pendingMessage}
            downloadText={downloadText}
            onDownload={
              isDownloadable(result.url, regexFilterDownloadHandler)
                ? handleDownload
                : undefined
            }
          />
        );
      })}
    </SearchResultsList>
  );
};

const MessageSearchResultsItem = memo(
  ({
    result,
    index,
    pendingMessage,
    onDownload,
    downloadText,
  }: {
    pendingMessage: boolean;
    result: MessageSearchResultsItemType;
    index: number;
    onDownload?: (result: MessageSearchResultsItemType, index: number) => void;
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
          $pendingMessage={pendingMessage}
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

          <SearchResultsItemNumber>
            <Typography
              data-source-number={index + 1}
              variant="body-m-medium"
            >
              {index + 1}
            </Typography>
          </SearchResultsItemNumber>
          {onDownload && (
            <Tooltip label={downloadText}>
              <TooltipConsumer>
                {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                  <SearchResultsItemDownload
                    onClick={() => onDownload(result, index)}
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
            componentsOverride={reasoningComponentsOverride}
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
