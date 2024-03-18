import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const IconsStyled = styled.div`
  padding: 20px;
`;

export const IconsTitle = styled(Typography)`
  font-weight: 600;
  font-size: 22px;
`;

export const IconList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 24px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border-radius: 8px;
  padding: 24px;
  gap: 20px;
  max-width: 800px;
`;
