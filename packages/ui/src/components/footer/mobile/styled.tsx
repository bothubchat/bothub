import { css, styled } from 'styled-components';
import { AddChatIcon } from '@/ui/icons';
import { adaptive } from '@/ui/adaptive';

export interface FooterMobileStyledProps {
  $isIOS?: boolean;
}

export const FooterMobileStyled = styled.div<FooterMobileStyledProps>`
  width: 100%;
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  border-top: 2px solid ${({ theme }) => theme.colors.grayScale.gray2};
  z-index: ${({ theme }) => theme.zIndex.menu};
  ${({ $isIOS }) =>
    $isIOS &&
    css`
      padding-bottom: 32px;
    `}
  ${adaptive({
    variant: 'dashboard',
    mobile: css`
      display: flex;
    `
  })}
`;

export interface FooterMobileButtonProps {
  $iconSize?: number;
}

export const FooterMobileButton = styled.button<FooterMobileButtonProps>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  &:active {
    opacity: 0.7;
    transform: translateY(1px);
  }
  transition: all 0.2s ease-out;
  ${({ $iconSize }) => css`
    svg {
      width: ${$iconSize ?? 26}px;
      height: ${$iconSize ?? 26}px;
      * {
        transition: all 0.2s ease-out;
      }
    }
  `}
`;

export const FooterMobileNewChatButton = styled(FooterMobileButton).attrs({
  children: <AddChatIcon />
})`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.accent.primary};
  svg path {
    stroke: ${({ theme }) => theme.default.colors.base.white};
  }
`;
