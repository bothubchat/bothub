import { css, styled } from 'styled-components';
import { ArrowNarrowDownIcon } from '@/ui/icons';

export const MessageListScrollButton = styled.button<{
  $visible: boolean;
}>`
  display: flex;
  position: absolute;
  justify-content: center;
  padding: 10px;
  bottom: 75px;
  left: 50%;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  opacity: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  transform: translateX(-50%);
  pointer-events: none;
  cursor: pointer;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray2};
    cursor: pointer;
  }

  transition: all 0.1s linear;
`;

export const MessageListArrowNarrowDownIcon = styled(ArrowNarrowDownIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
