import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const ThemeStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  padding: 20px;
`;

export const ThemeGroup = styled.div``;

export const ThemeTitle = styled(Typography)`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.semiBold};
`;

export const ThemeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 24px;
  background: #181F2F;
  border-radius: 8px;
  padding: 24px;
  gap: 12px;
  max-width: 1000px;
`;

export const ThemeItem = styled.span`
  display: inline-flex;
  gap: 12px;
  width: 100%;
  max-width: 300px;
  min-height: 54px;
  align-items: center;
  cursor: pointer;
`;

export const ThemeItemPreview = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 54px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray6};
  color: ${({ theme }) => theme.colors.base.white};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
`;

export const ThemeItemColor = styled(ThemeItemPreview)<{ $color: string }>`
  background: ${({ $color }) => $color};
  border: 1px solid ${({ theme, $color }) => ($color === theme.colors.base.black ? '#4F536A' : '#181F2F')};
`;

export const ThemeItemFont = styled(ThemeItemPreview)<{ $font: string }>`
  font-family: ${({ $font }) => $font};
`;

export const ThemeItemText = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ThemeItemName = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.semiBold};
  font-size: 14px;
  line-height: 1;
`;

export const ThemeItemValue = styled(Typography)`
  display: inline-flex;
  flex-basis: auto;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
  color: #bec2be;
  line-height: 1;
  margin-top: 5px;
`;
