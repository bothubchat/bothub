import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Progress } from '@/ui/components/progress';
import { Button } from '@/ui/components/button';

export const ReferralCardStyled = styled.div`
  display: flex;
  width: 100%;
  max-width: 1328px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 14px;
  overflow: hidden;
`;

export const ReferralCardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ReferralCardTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ReferralCardAI = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 28px;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
`;

export const ReferralCardAIName = styled(Typography).attrs({ variant: 'body-xl-semibold' })`
  white-space: pre-wrap;
  text-align: center;
`;

export const ReferralCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 370px;
`;

export const ReferralCardName = styled(Typography).attrs({ variant: 'body-m-medium' })``;

export const ReferralCardPrice = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 16px;
`;

export const ReferralCardPriceProgress = styled(Progress).attrs({ fullWidth: true })``;

export const ReferralCardPriceRange = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const ReferralCardPriceRangeText = styled(Typography).attrs({ variant: 'body-m-regular' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const ReferralCardTable = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 100%;
  row-gap: 16px;
`;

export const ReferralCardTableRow = styled.div`
  display: flex;
`;

export const ReferralCardTableCell = styled(Typography).attrs({ variant: 'body-m-medium' })`
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
  padding: 24px 28px;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
`;

export const ReferralCardWithdrawButton = styled(Button).attrs({ children: 'Вывести средства' })``;

export const ReferralCardDateCreated = styled(Typography).attrs({ variant: 'body-m-medium' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;
