import { styled } from 'styled-components';
import { Scrollbar } from '@/ui/components/scrollbar';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons';

export const SliderTabsStyled = styled.div`
  position: relative;
  max-width: 350px;
  overflow: hidden;
  height: 48px;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 32px;
    height: 100%;
    z-index: 10;
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
`;

export const SliderTabsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const SliderTabsScrollBar = styled(Scrollbar).attrs({
  isHorizontalScrollbar: true
})`
  padding-bottom: 16px;
  overflow-y: hidden;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const SliderTabsItem = styled.div`
  background-color: ${({ theme }) => theme.colors.grayScale.gray7};
  padding: 10px 18px;
  border-radius: 8px;
  user-select: none;
`;

export const SliderTabsItemText = styled(Typography).attrs({
  variant: 'button-sm'
})``;

export const SliderTabsArrow = styled(ArrowDownIcon)<{
  $place?: 'left' | 'right';
}>`
  width: 16px;
  height: 16px;
  transform: rotate(
    ${({ $place }) => ($place === 'left' ? '90deg' : '-90deg')}
  );
  position: absolute;
  ${({ $place }) => ($place === 'right' ? 'right: 0' : 'left: 0')};
  top: 50%;
  margin-top: -12px;
  cursor: pointer;
  z-index: 10;
  color: ${({ theme }) => theme.colors.grayScale.gray4};
`;
