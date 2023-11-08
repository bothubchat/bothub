import { styled } from 'styled-components';
import { AnimationProps, motion } from 'framer-motion';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';

export const SidebarStyled: React.FC<React.ComponentProps<'aside'> & AnimationProps> = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border-radius: 18px;
  overflow: hidden;
  padding: 24px 20px;
  box-sizing: border-box;
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const SidebarHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
`;

export const SidebarBottom = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarBody = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  margin: 34px 0px;
`;

export const SidebarBodyScrollbarWrapper = styled(Scrollbar).attrs({ 
  variant: 'secondary',
  scrollShadows: {
    size: 140,
    top: <ScrollbarShadow side="top" />,
    bottom: <ScrollbarShadow side="bottom" />
  }
})`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SidebarBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
