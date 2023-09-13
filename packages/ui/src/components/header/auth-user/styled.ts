import styled, { css } from 'styled-components';
import { Typography } from '../../typography';
import { ArrowDownIcon } from '../../icons';

export const HeaderAuthUserHead = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 22px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  &:hover {
    background: ${({ theme }) => theme.colors.grayScale.gray3};
  }
`;

export const HeaderAuthUserStyled = styled.div<{ $inMenu: boolean }>`
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
    > ${HeaderAuthUserHead} {
      width: 100%;
      justify-content: space-between;
    }
  `}
`;

export const HeaderAuthUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderAuthUserAvatar = styled.img`
  display: inline-flex;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
`;

export const HeaderAuthUserInfoText = styled.span``;

export const HeaderAuthUserName = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
  line-height: 18px;
`;

export const HeaderAuthUserTokens = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 12px;
  line-height: 16px;
`;

export const HeaderAuthUserArrow = styled(ArrowDownIcon)``;

export const HeaderAuthUserBody = styled.div<{ $width: number }>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  position: absolute;
  margin-top: 14px;
  padding: 14px 0px;
  width: ${({ $width }) => $width ? `${$width}px` : '170px'};
`;

export const HeaderAuthUserList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
`;
