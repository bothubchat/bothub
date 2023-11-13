import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { Plus1Icon } from '@/ui/icons';
import { adaptive } from '@/ui/adaptive';

export const DeveloperKeysStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const DeveloperKeysTitle = styled(Typography).attrs({ component: 'h3', variant: 'h2' })`
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      margin-bottom: 20px;
    `,
    tablet: css`
      margin-bottom: 18px;
    `,
    mobile: css`
      margin-bottom: 14px;
    `
  })}
`;

export const DeveloperKeyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      gap: 20px;
    `,
    tablet: css`
      gap: 18px;
    `,
    mobile: css`
      gap: 14px;
    `
  })}
`;

export const DeveloperKeysButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      gap: 20px;
      margin-top: 20px;
    `,
    tablet: css`
      gap: 18px;
      margin-top: 18px;
    `,
    mobile: css`
      gap: 14px;
      margin-top: 14px;
    `
  })}
  
`;

export const AddDeveloperKeyButton = styled(Button).attrs({
  size: 'md',
  startIcon: <Plus1Icon />
})``;
