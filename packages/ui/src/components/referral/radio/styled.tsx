import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Radio } from '@/ui/components/radio';

export interface ReferralRadioStyledProps {
  $checked: boolean;
  $skeleton: boolean;
}

export const ReferralRadioStyled = styled.div<ReferralRadioStyledProps>`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  max-width: 463px;
  background: ${({ theme }) =>
    theme.mode === 'light'
      ? theme.default.colors.base.white
      : 'rgba(0, 0, 0, 0)'};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 10px;
  overflow: hidden;
  min-width: 324px;
  ${({ $checked, $skeleton }) => {
    if ($skeleton) {
      return css``;
    }
    if ($checked) {
      return css`
        border-color: ${({ theme }) => theme.colors.accent.primary};
      `;
    }

    return css`
      &:hover {
        border-color: ${({ theme }) => theme.colors.accent.primary};
      }
    `;
  }}
`;

export interface ReferralRadioContentProps {
  $checked: boolean;
  $skeleton: boolean;
}

export const ReferralRadioContent = styled.label<ReferralRadioContentProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  cursor: ${({ $skeleton, $checked }) => {
    if ($skeleton) {
      return 'progress';
    }

    return $checked ? 'default' : 'pointer';
  }};
`;

export const ReferralRadioHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const ReferralRadioName = styled(Typography).attrs({
  variant: 'body-m-semibold',
})``;

export const ReferralRadioRadio = styled(Radio)``;

export const ReferralRadioBody = styled.div`
  display: flex;
  width: 100%;
`;

export const ReferralRadioTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 12px;
`;

export const ReferralRadioTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ReferralRadioTableCell = styled(Typography).attrs({
  variant: 'body-m-semibold',
})`
  display: inline-flex;
  --skeleton-width: 100px;
`;

export const ReferralRadioTableHeadCell = styled(Typography).attrs({
  variant: 'body-m-regular',
})`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  --skeleton-width: 240px;
`;

export const ReferralRadioTableSelectedCell = styled(ReferralRadioTableCell)`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.accent.primary};
`;

export const ReferralRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;
