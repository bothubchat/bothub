import { css, styled } from 'styled-components';
import { ArrowNarrowDownIcon } from '@/ui/icons';

export const MessageListScrollButton = styled.button<{
  $visible: boolean;
}>`
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  size: 38px;
  border-radius: 50%;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  box-shadow: 0px 0px 1px 0px rgba(255, 255, 255, 0.4) inset;
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

  @media (max-width: 1101px) {
    bottom: 60px;
  }
`;

export const MessageListArrowNarrowDownIcon = styled(ArrowNarrowDownIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
