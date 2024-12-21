import styled from 'styled-components';
import { Image } from '@/ui/components/image';

export const ZoommableImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ZoommableImageStyled = styled(Image)`
  cursor: inherit;
  transform-origin: center center;
`;
