import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';

export const PromptsStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PromptsLabel = styled(Typography).attrs({ component: 'h2', variant: 'h3' })`
  ${adaptive(() => ({
    desktop: css`
      margin-bottom: 34px;
    `,
    tablet: css`
      margin-bottom: 30px;
    `,
    mobile: css`
      margin-bottom: 24px;
    `
  }))}
`;

export const PromptList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${adaptive(() => ({
    desktop: css`
      gap: 20px;
    `,
    tablet: css`
      gap: 18px;
    `,
    mobile: css`
      gap: 14px;
    `
  }))}
`;
