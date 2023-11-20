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

export const DeveloperKeysTitle = styled(Typography).attrs({ component: 'h3', variant: 'h2' })``;

export const DeveloperKeyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      margin: 20px 0px;
      gap: 20px;
    `,
    tablet: css`
      margin: 18px 0px;
      gap: 18px;
    `,
    mobile: css`
      margin: 14px 0px;
      gap: 14px;
    `
  })}
`;

export const DeveloperKeysButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const AddDeveloperKeyButton = styled(Button).attrs({
  size: 'md',
  startIcon: <Plus1Icon />
})``;
