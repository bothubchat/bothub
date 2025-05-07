import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { CloseIcon } from '@/ui/icons/close';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';

export const ModalWindowStyled = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 494px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 17px;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.modal};

  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    margin: 0px 10px;
  }
`;

export const ModalWindowBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  padding-right: 10px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    padding: 18px;
    padding-right: 9px;
  }

  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 14px 18px;
    padding-right: 9px;
  }
`;

export const ModalWindowTitle = styled(Typography)`
  font-weight: 700;
  font-size: 22px;
  line-height: 29px;
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 18px;
  }

  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 14px;
  }
`;

export const ModalWindowCloseButton = styled.button`
  display: inline-flex;
  position: absolute;
  top: 22.5px;
  right: 20px;
  z-index: 1;
  padding: 0px;
  background: none;
  border: none;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.colors.grayScale.gray1};
  }

  &:hover path {
    fill: ${({ theme }) =>
      theme.mode === 'light'
        ? theme.default.colors.accent.primary
        : theme.colors.base.white};
  }

  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    > svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const ModalWindowCloseButtonIcon = styled(CloseIcon)``;

export const ModalWindowBodyContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const ModalWindowBodyScrollbarWrapper = styled(Scrollbar).attrs(
  ({ theme }) => ({
    variant: 'secondary',
    scrollShadows: {
      color: theme.colors.grayScale.gray3,
      top: <ScrollbarShadow side="top" />,
      bottom: <ScrollbarShadow side="bottom" />
    }
  })
)`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 80vh;
`;

export const ModalWindowContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding-right: 10px;

  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    padding-right: 9px;
  }
`;
