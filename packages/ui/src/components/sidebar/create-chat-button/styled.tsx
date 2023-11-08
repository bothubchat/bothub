import { styled } from 'styled-components';
import { AnimationProps, motion } from 'framer-motion';
import { Button } from '@/ui/components/button';
import { Plus1Icon } from '@/ui/icons';

export const SidebarCreateChatButtonContainer: React.FC<AnimationProps & React.PropsWithChildren> = styled(motion.div)`
  display: flex;
  overflow: hidden;
  width: 100%;
`;

export const SidebarCreateChatButtonStyled = styled(Button).attrs({
  startIcon: <Plus1Icon />,
  fullWidth: true,
  children: 'Создать чат'
})`
  margin-right: 24px;
  flex-shrink: 0;
  white-space: nowrap;
`;
