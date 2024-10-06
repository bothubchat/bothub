import { AnimationProps, motion } from 'framer-motion';
import { css, styled } from 'styled-components';
import { HeaderVariant } from '../types';
import { adaptive } from '@/ui/adaptive';

export interface HeaderMenuStyledProps {
  $variant: HeaderVariant;
}

export const HeaderMenuStyled = styled.div`
  position: relative;
`;

export const HeaderMenuContent = styled(motion.div) <HeaderMenuStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  background: ${({ theme }) => theme.colors.base.black};
  gap: 40px;
  overflow: auto;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: ${({ theme }) => theme.zIndex.headerMenu};
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'main':
        return adaptive({
          variant: $variant,
          desktop: css`
            display: none;
            height: calc(100vh - ${theme.header.height});
          `,
          tablet: css`
            padding: 42px 40px;
            height: calc(100vh - ${theme.header.height});
          `,
          mobile: css`
            padding: 32px 30px;
            height: calc(100vh - ${theme.header.mobile.height});
          `
        });
      case 'dashboard':
        return adaptive({
          variant: $variant,
          desktop: css`
            display: none;
            height: calc(100vh - ${theme.dashboard.header.height});
          `,
          tablet: css`
            display: none;
          `,
          mobile: css`
            display: none;
          `
        });
    }
  }}
` as React.FC<AnimationProps & HeaderMenuStyledProps & React.PropsWithChildren>;
