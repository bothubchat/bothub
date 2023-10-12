import React from 'react';
import { 
  PresetCardAddStars,
  PresetCardContent, 
  PresetCardDescription,
  PresetCardLine, 
  PresetCardMain,
  PresetCardName,
  PresetCardNameActions,
  PresetCardStar,
  PresetCardStarList,
  PresetCardStars,
  PresetCardStyled,
  PresetCardCategoryPrice,
  PresetCardCategory,
  PresetCardPrice
} from './styled';
import { useTheme } from '@/ui/theme';
import { IconProvider } from '@/ui/components/icon';

export interface PresetCardProps {
  className?: string;
  name: string;
  actions?: React.ReactNode;
  description: string;
  add?: React.ReactNode;
  stars?: number;
  category?: string;
  price: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const PresetCard: React.FC<PresetCardProps> = ({
  className, 
  name, 
  actions, 
  description, 
  add, 
  stars, 
  category, 
  price,
  onClick
}) => {
  const theme = useTheme();

  return (
    <PresetCardStyled 
      className={className}
      onClick={onClick} 
    >
      <PresetCardContent>
        <PresetCardLine />
        <PresetCardMain>
          <PresetCardNameActions>
            <PresetCardName>
              {name}
            </PresetCardName>
            {actions}
          </PresetCardNameActions>
          <PresetCardDescription>
            {description}
          </PresetCardDescription>
          {typeof stars === 'number' && (
            <PresetCardAddStars>
              {add}
              <PresetCardStars>
                <PresetCardStarList>
                  {[...Array(5)].map((_, index) => (
                    <IconProvider
                      fill={index < stars ? theme.colors.orange : theme.colors.grayScale.gray5}
                      size={20}
                    >
                      <PresetCardStar
                        key={index}
                        fill={index < stars ? theme.colors.orange : theme.colors.grayScale.gray5}
                        size={20}
                      />
                    </IconProvider>
                  ))}
                </PresetCardStarList>
              </PresetCardStars>
            </PresetCardAddStars>
          )}
          <PresetCardCategoryPrice>
            {typeof category === 'string' && (
              <PresetCardCategory>
                {category}
              </PresetCardCategory>
            )}
            <PresetCardPrice>
              {price}
            </PresetCardPrice>
          </PresetCardCategoryPrice>
        </PresetCardMain>
      </PresetCardContent>
    </PresetCardStyled>
  );
};

export * from './styled';
