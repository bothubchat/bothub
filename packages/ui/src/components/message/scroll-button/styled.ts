import { css, styled } from 'styled-components';
import { ArrowNarrowDownIcon } from '@/ui/icons';
import { themeVar } from '@/ui/theme';

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
  border: 2px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
  z-index: ${({ theme }) => theme.zIndex.header};
  cursor: pointer;
  /* Hidden: drops a little and fades; visibility goes last, after the fade */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate(-50%, 8px) scale(0.92);
  transition:
    opacity 180ms ease-out,
    transform 260ms cubic-bezier(0.32, 0.72, 0, 1),
    visibility 0s linear 260ms,
    background-color 150ms ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      transition:
        opacity 180ms ease-out,
        transform 260ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 0s,
        background-color 150ms ease;
    `}

  &:hover {
    background-color: ${({ theme }) =>
      themeVar(theme, 'colors.grayScale.gray2')};
  }

  @media (prefers-reduced-motion: reduce) {
    transform: translateX(-50%);
    transition:
      opacity 150ms linear,
      visibility 0s linear ${({ $visible }) => ($visible ? 0 : 150)}ms;
  }
`;

export const MessageListArrowNarrowDownIcon = styled(ArrowNarrowDownIcon)`
  path {
    fill: ${({ theme }) => themeVar(theme, 'colors.base.white')};
  }
`;
