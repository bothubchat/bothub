import { styled } from 'styled-components';
import { ArrowNarrowDownIcon } from '@/ui/icons';

export const MessageListScrollButton = styled.button`
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  size: 38px;
  border-radius: 50%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  box-shadow: 0px 0px 1px 0px rgba(255, 255, 255, 0.4) inset;
  @media (min-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: none;
  }
`;

export const MessageListArrowNarrowDownIcon = styled(ArrowNarrowDownIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
