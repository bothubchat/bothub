import React, { useCallback } from 'react';
import { flatten } from 'flat';
import {
  ThemeGroup,
  ThemeItem,
  ThemeItemColor,
  ThemeItemName,
  ThemeItemPreview,
  ThemeItemText,
  ThemeItemValue,
  ThemeList,
  ThemeStyled,
  ThemeTitle
} from './styled';
import { useTheme } from '@/ui/theme';

export const Theme: React.FC = () => {
  const theme = useTheme();

  const handleItemClick = useCallback((value: string) => {
    window.navigator.clipboard.writeText(value);
    alert('Copied to clipboard');
  }, []);

  return (
    <ThemeStyled>
      {Object.entries(theme).map(([category, data], index) => {
        const categoryName: string =
          category[0].toUpperCase() + category.substring(1);

        return (
          <ThemeGroup key={index}>
            <ThemeTitle>{categoryName}</ThemeTitle>
            <ThemeList>
              {Object.entries(flatten(data) as Record<string, unknown>).map(
                ([name, value], index) => {
                  if (typeof value === 'string' || typeof value === 'number') {
                    let previewNode: React.ReactNode;
                    switch (category) {
                      case 'colors':
                        previewNode = (
                          <ThemeItemColor $color={value.toString()} />
                        );
                        break;
                      default:
                        previewNode = (
                          <ThemeItemPreview>{value}</ThemeItemPreview>
                        );
                        break;
                    }

                    return (
                      <ThemeItem
                        key={index}
                        onClick={handleItemClick.bind(
                          null,
                          `theme.${category}.${name}`
                        )}
                      >
                        {previewNode}
                        <ThemeItemText>
                          <ThemeItemName>{name}</ThemeItemName>
                          <ThemeItemValue>{value}</ThemeItemValue>
                        </ThemeItemText>
                      </ThemeItem>
                    );
                  }

                  return null;
                }
              )}
            </ThemeList>
          </ThemeGroup>
        );
      })}
    </ThemeStyled>
  );
};
