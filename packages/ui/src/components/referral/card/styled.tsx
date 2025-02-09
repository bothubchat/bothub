import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Progress } from '@/ui/components/progress';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';

export const ReferralCardStyled = styled.div`
  display: flex;
  width: 100%;
  background: ${({ theme }) =>
    theme.mode === 'light'
      ? theme.default.colors.base.white
      : theme.colors.grayScale.gray4};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 14px;
  overflow: hidden;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      max-width: 1328px;
    `,
    tablet: css`
      max-width: 706px;
    `,
    mobile: css`
      max-width: 100%;
    `
  })}
`;

export const ReferralCardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ReferralCardTop = styled.div`
  display: flex;
  width: 100%;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      align-items: center;
    `,
    tablet: css`
      flex-direction: column;
    `,
    mobile: css`
      flex-direction: column;
    `
  })}
`;

export const ReferralCardMain = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ReferralCardAI = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      padding: 28px;
    `,
    tablet: css`
      padding: 30px 32px;
    `,
    mobile: css`
      padding: 34px 18px;
    `
  })}
`;

export const ReferralCardAIName = styled(Typography).attrs({
  variant: 'body-xl-semibold'
})`
  white-space: pre-wrap;
  text-align: center;
`;

export const ReferralCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      padding: 28px;
    `,
    tablet: css`
      padding: 23px 28px;
    `,
    mobile: css`
      padding: 16px 18px;
    `
  })}
`;

export const ReferralCardName = styled(Typography).attrs({
  variant: 'body-m-medium'
})``;

export const ReferralCardPrice = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 16px;
`;

export const ReferralCardPriceProgress = styled(Progress).attrs({
  fullWidth: true
})``;

export const ReferralCardPriceRange = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const ReferralCardPriceRangeText = styled(Typography).attrs({
  variant: 'body-m-regular'
})`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const ReferralCardTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      padding: 24px;
    `,
    tablet: css`
      padding: 18px 28px;
    `,
    mobile: css`
      padding: 14px 16px;
    `
  })}
  ${adaptive(({ theme }) => ({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      border-top: 1px solid ${theme.colors.grayScale.gray3};
    `
  }))}
`;

export const ReferralCardTableRow = styled.div`
  display: flex;
  ${adaptive({
    variant: 'dashboard',
    tablet: css`
      justify-content: space-between;
    `
  })}
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ReferralCardTableCell = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  display: inline-flex;
  width: 100%;
  --skeleton-width: 340px;
`;

export const ReferralCardTableHeadCell = styled(ReferralCardTableCell)`
  width: 330px;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  --skeleton-width: 200px;
`;

export const ReferralCardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      padding: 24px 28px;
    `,
    tablet: css`
      padding: 18px 28px;
    `,
    mobile: css`
      padding: 14px 16px;
    `
  })}
  @media (max-width: 600px) {
    gap: 14px;
    flex-direction: column;
  }
`;

export const ReferralCardWithdrawButton = styled(Button)`
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ReferralCardDateCreated = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;
