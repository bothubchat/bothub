import { css, styled } from 'styled-components';
import { AnimationProps, motion } from 'framer-motion';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';
import { Scrollbar } from '@/ui/components/scrollbar';

export const SidebarMenuStyled = styled.div``;

export const SidebarMenuToggleButton = styled(Button)`
  margin-left: 16px;
  svg {
    pointer-events: none;
  }
`;

export const SidebarMenuBlock: React.FC<React.ComponentProps<'div'> & AnimationProps> = styled(motion.div)`
  display: flex;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.menu};
  top: 53px;
  left: 0px;
  background: ${({ theme }) => theme.colors.base.black};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 12px;
  overflow: hidden;
  padding: 16px;
  padding-right: 8px;
  transform-origin: top center;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      right: 9px;
    `,
    tablet: css`
      right: 7px;
    `
  })}
`;

export const SidebarMenuBlockScrollbarWrapper = styled(Scrollbar).attrs({ variant: 'secondary' })`
  width: 100%;
  padding-right: 8px;
  @media (max-height: 720px) {
    max-height: 142px;
  }
`;

export const SidebarMenuBlockContent = styled.div``;

export const SidebarMenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
