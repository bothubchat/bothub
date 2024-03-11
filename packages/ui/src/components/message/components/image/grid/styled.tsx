import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';

export const MessageImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  ${adaptive({
    mobile: css`
      display: flex;
    `
  })}
`;
