import { css, styled } from 'styled-components';
import { Radio } from '@/ui/components/radio';
import { Image } from '@/ui/components/image';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';

export const ThemeCardStyled = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  border-radius: 20px;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  &:hover {
    cursor: pointer;
  }
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
`;

export const ThemeCardTopbar = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
`;

export const ThemeCardTopbarRadio = styled(Radio).attrs({
  onClick: (e) => e.stopPropagation(),
})``;

export const ThemeCardTopbarTitle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ThemeCardTopbarTitleText = styled(Typography).attrs({
  variant: 'body-m-medium',
})``;

export const ThemeCardImage = styled(Image)`
  padding-left: 20px;
  width: 440px;
  height: 220px;
  object-fit: cover;
  object-position: 0 0;
  ${adaptive({
    tablet: css`
      height: 180px;
    `,
    mobile: css`
      height: 140px;
    `,
  })}
`;
