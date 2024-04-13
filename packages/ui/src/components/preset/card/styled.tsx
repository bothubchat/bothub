import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons/close';
import { EditIcon } from '@/ui/icons/edit';
import { StarIcon } from '@/ui/icons/star';
import { Badge } from '@/ui/components/badge';
import { adaptive } from '@/ui/adaptive';
import { LoaderCircularGradientIcon } from '@/ui/icons/loader-circular-gradient';

export interface PresetCardStyledProps {
  $skeleton: boolean;
  $loading: boolean;
}

export const PresetCardStyled = styled.div<PresetCardStyledProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 427px;
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  box-sizing: border-box;
  cursor: ${({ $skeleton, $loading }) => {
    if ($skeleton || $loading) {
      return 'progress';
    }

    return 'pointer';
  }};
  ${({ $skeleton }) => css`
    ${PresetCardActions} {
      visibility: hidden;
    }
    ${!$skeleton && css`
      &:hover {
        ${PresetCardActions} {
          visibility: visible;
        }
      }
      ${adaptive({
    touch: css`
      ${PresetCardActions} {
        visibility: visible;
      }
    `
  })}
    `}
  `}
`;

export const PresetCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface PresetCardLineProps {
  $skeleton: boolean;
}

export const PresetCardLine = styled.div<PresetCardLineProps>`
  display: flex;
  width: 100%;
  height: 37px;
  background: ${({ theme, $skeleton }) => {
    if ($skeleton) {
      return theme.colors.grayScale.gray1;
    } 

    return theme.colors.accent.primary;
  }};
`;

export const PresetCardMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
`;

export const PresetCardNameActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PresetCardName = styled(Typography).attrs({ variant: 'body-m-semibold', component: 'span' })``;

export const PresetCardActions = styled.div`
  display: flex;
  gap: 14px;
`;

export const PresetCardAction = styled(Button).attrs({ variant: 'text', iconSize: 18 })``;

export const PresetCardFavoriteAction = styled(PresetCardAction).attrs({ children: <StarIcon /> })``;

export const PresetCardEditAction = styled(PresetCardAction).attrs({ children: <EditIcon /> })``;

export const PresetCardDeleteAction = styled(PresetCardAction).attrs({ children: <CloseIcon /> })``;

export interface PresetCardDescriptionProps {
  $skeleton?: boolean;
}

export const PresetCardDescription = styled(Typography).attrs({ variant: 'body-m-regular' })<PresetCardDescriptionProps>`
  margin-top: 14px;
  ${({ $skeleton }) => $skeleton && css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `}
`;

export const PresetCardCategories = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  padding-top: 12px;
`;

export const PresetCardCategory = styled(Badge).attrs({ variant: 'blue' })`
  cursor: inherit;
`;

export const PresetCardLoader = styled(LoaderCircularGradientIcon).attrs({ size: 18 })``;
