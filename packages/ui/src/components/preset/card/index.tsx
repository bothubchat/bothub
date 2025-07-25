import React from 'react';
import {
  PresetCardCategories,
  PresetCardCategory,
  PresetCardContent,
  PresetCardDescription,
  PresetCardLine,
  PresetCardLoader,
  PresetCardMain,
  PresetCardName,
  PresetCardNameActions,
  PresetCardStyled,
  PresetCardTop,
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';

export interface PresetCardProps {
  className?: string;
  name?: React.ReactNode;
  color?: string;
  actions?: React.ReactNode;
  description?: React.ReactNode;
  categories?: React.ReactNode;
  skeleton?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const PresetCard: React.FC<PresetCardProps> = ({
  className,
  name,
  color,
  actions,
  description,
  categories,
  skeleton = false,
  loading = false,
  onClick,
}) => (
  <PresetCardStyled
    $skeleton={skeleton}
    $loading={loading}
    className={className}
    onClick={onClick}
  >
    <PresetCardContent>
      {!skeleton && (
        <PresetCardLine
          $skeleton={false}
          $color={color}
        />
      )}
      {skeleton && (
        <PresetCardLine
          $skeleton
          as={Skeleton}
          variant="rectangular"
        />
      )}
      <PresetCardMain>
        <PresetCardTop>
          <PresetCardNameActions>
            {skeleton && (
              <PresetCardName>
                <Skeleton width={220} />
              </PresetCardName>
            )}
            {!skeleton && (
              <>
                {typeof name === 'string' && (
                  <Tooltip
                    label={name}
                    placement="top-left"
                    disabled={name.length <= 84}
                  >
                    <TooltipConsumer>
                      {({
                        handleTooltipMouseEnter,
                        handleTooltipMouseLeave,
                      }) => (
                        <PresetCardName
                          onMouseEnter={handleTooltipMouseEnter}
                          onMouseLeave={handleTooltipMouseLeave}
                        >
                          {name.slice(0, 84)}
                          {name.length > 84 && '...'}
                        </PresetCardName>
                      )}
                    </TooltipConsumer>
                  </Tooltip>
                )}
                {typeof name !== 'string' && name}
              </>
            )}
            {loading && <PresetCardLoader />}
            {!loading && actions}
          </PresetCardNameActions>
          {skeleton && (
            <PresetCardDescription $skeleton>
              <Skeleton width={260} />
              <Skeleton width={180} />
            </PresetCardDescription>
          )}
          {!skeleton && (
            <>
              {typeof description === 'string' && (
                <Tooltip
                  label={description}
                  placement="top-left"
                  disabled={description.length <= 128}
                >
                  <TooltipConsumer>
                    {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                      <PresetCardDescription
                        onMouseEnter={handleTooltipMouseEnter}
                        onMouseLeave={handleTooltipMouseLeave}
                      >
                        {description.slice(0, 128)}
                        {description.length > 128 && '...'}
                      </PresetCardDescription>
                    )}
                  </TooltipConsumer>
                </Tooltip>
              )}
              {typeof description !== 'string' && description}
            </>
          )}
        </PresetCardTop>
        {skeleton && categories && (
          <PresetCardCategories>
            <PresetCardCategory skeleton />
            <PresetCardCategory skeleton />
            <PresetCardCategory skeleton />
          </PresetCardCategories>
        )}
        {!skeleton && categories}
      </PresetCardMain>
    </PresetCardContent>
  </PresetCardStyled>
);

export * from './styled';
