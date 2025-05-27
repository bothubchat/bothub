import { ComponentProps } from 'react';
import * as S from './styled';

export type TagBadgeProps = {
  color?: string;
} & ComponentProps<'div'>;

export const TagBadge = ({ children, color }: TagBadgeProps) => (
  <S.TagBadgeStyled $color={color}>
    <S.TagBadgeName>{children}</S.TagBadgeName>
    <S.TagBadgeIcon />
  </S.TagBadgeStyled>
);

export * from './styled';
