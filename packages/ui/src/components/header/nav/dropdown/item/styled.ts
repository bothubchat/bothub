import { styled } from 'styled-components';
import React from 'react';
import { Typography } from '@/ui/components/typography';

export const HeaderNavDropdownItemStyled = styled.a`
  display: flex;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    width: 100%;
  }
`;

export const HeaderNavDropdownItemContent: React.FC<
  React.ComponentProps<'div'>
> = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  padding: 14px;
  border-radius: 8px;
  width: 100%;

  transform: scale(1);
  background: rgba(255, 255, 255, 0);
  transition:
    transform 0.2s ease-out,
    background 0.2s ease-out;
  &:hover {
    background: rgba(255, 255, 255, 0.045);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const HeaderNavDropdownInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HeaderNavDropdownTitle = styled(Typography)`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
`;

export const HeaderNavDropdownText = styled(Typography)`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`;
