import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { TypographyStyled } from '@/ui/components/typography/styled';

export const SearchResultsList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 0;
`;

export const SearchResultsItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  transition: background-color 0.3s ease-out;

  & > div[data-source-content] ${TypographyStyled} {
    transition: color 0.3s ease-out;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === 'light'
        ? 'rgba(71, 133, 255, 0.2)'
        : 'rgba(28, 100, 242, 0.2)'};

    & > div[data-source-content] ${TypographyStyled} {
      color: ${({ theme }) => theme.colors.base.white};
    }
  }
`;

export const SearchResultsItemLink = styled.a`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  cursor: pointer;
`;

export const SearchResultsItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const SearchResultsItemName = styled(Typography)`
  &[data-source-name] {
    color: ${({ theme }) => theme.colors.base.white};
  }
`;

export const SearchResultsItemNumber = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  min-width: 24px;
  height: 22px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray1};

  & > span[data-source-number] {
    color: #fff;
  }
`;

export const SearchResultsItemTitle = styled(Typography)`
  &[data-source-title] {
    color: ${({ theme }) => theme.colors.base.white};
  }
`;
