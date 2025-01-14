import { styled } from 'styled-components';
import { Image } from '@/ui/components/image';

export const ZoommableImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ZoommableImageWrapper = styled.div`
  position: relative;
  will-change: transform;
  transform-origin: center;
`;

export const ZoommableImageStyled = styled(Image)`
  cursor: inherit;
  transform-origin: center center;
  border-radius: 10px;
`;
