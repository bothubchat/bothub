import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import {
  CloseIcon, EditIcon, Plus2Icon, StarIcon 
} from '@/ui/icons';

export const PresetCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 427px;
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  box-sizing: border-box;
  cursor: pointer;
  ${() => css`
    ${PresetCardActions} {
      visibility: hidden;
    }
    &:hover {
      ${PresetCardActions} {
        visibility: visible;
      }
    }
  `}
`;

export const PresetCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PresetCardLine = styled.div`
  display: flex;
  width: 100%;
  height: 37px;
  background: ${({ theme }) => theme.colors.accent.primary};
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

export const PresetCardEditAction = styled(PresetCardAction).attrs({ children: <EditIcon /> })``;

export const PresetCardDeleteAction = styled(PresetCardAction).attrs({ children: <CloseIcon /> })``;

export const PresetCardDescription = styled(Typography).attrs({ variant: 'body-m-regular' })`
  margin-top: 14px;
`;

export const PresetCardAddStars = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 12px;
`;

export const AddPresetMyButton = styled(Button).attrs({
  variant: 'text',
  children: 'Добавить к себе', 
  endIcon: <Plus2Icon size={18} /> 
})`
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.accent.primaryLight};
  svg path {
    fill: ${({ theme }) => theme.colors.accent.primaryLight};
  }
`;

export const PresetCardStars = styled.div`
  display: flex;
`;

export const PresetCardStarList = styled.div`
  display: flex;
  gap: 4px;
`;

export interface PresetCardStarProps {
  $filled: boolean;
}

export const PresetCardStar = styled(StarIcon)``;

export const PresetCardCategoryPrice = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  margin-top: 12px;
  padding-top: 12px;
`;

export const PresetCardCategory = styled(Typography).attrs({ variant: 'body-s-medium' })`
  display: inline-flex;
  padding: 2px 12px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.accent.primary};
`;

export const PresetCardPrice = styled(Typography).attrs({ variant: 'body-s-medium' })`
  display: inline-flex;
  padding: 2px 12px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.accent.primary};
`;
