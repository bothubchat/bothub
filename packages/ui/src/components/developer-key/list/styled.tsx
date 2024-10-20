import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { Plus2Icon } from '@/ui/icons/plus-2';
import { adaptive } from '@/ui/adaptive';
import { GearIcon } from '@/ui/icons/gear';

export const DeveloperKeysStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 34px;
  width: 100%;
`;

export const DeveloperKeysHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const DeveloperKeysTitle = styled(Typography).attrs({
  component: 'h3',
  variant: 'h2',
})``;

export const DeveloperKeysIcon = styled(GearIcon).attrs({
  size: 50,
})`
  padding: 10px;
  border-radius: 8px;
  border: ${({ theme }) => theme.colors.grayScale.gray1} 1px solid;
`;

export const DeveloperKeyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    `,
  })}
`;

export const DeveloperKeysButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const AddDeveloperKeyButton = styled(Button).attrs({
  size: 'md',
  startIcon: <Plus2Icon />,
  iconSize: 18,
})``;
