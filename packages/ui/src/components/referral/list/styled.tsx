import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { Button } from '@/ui/components/button';

export const ReferralsStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReferralList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ReferralsButtons = styled.div`
  display: flex;
  gap: 34px;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      margin-top: 34px;
    `,
    tablet: css`
      margin-top: 30px;
    `,
    mobile: css`
      margin-top: 24px;
    `
  })}
`;

export const CreateReferralButton = styled(Button).attrs({ size: 'small' })`
  ${adaptive({
    variant: 'dashboard',
    mobile: css`
      width: 100%;
    `
  })}
`;
