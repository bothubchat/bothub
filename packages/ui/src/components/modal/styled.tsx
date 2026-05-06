import { css, styled } from 'styled-components';
import { Scrollbar } from '../scrollbar';

export const ModalStyled = styled.div.attrs<{
  $scrollbarEnabled: boolean;
  $align: 'center' | 'flex-start';
}>(({ $scrollbarEnabled }) => ({
  as: $scrollbarEnabled ? Scrollbar : 'div',
}))`
  display: flex;
  justify-content: center;
  align-items: ${({ $scrollbarEnabled, $align }) =>
    $scrollbarEnabled ? $align : 'center'};
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};

  ${({ $scrollbarEnabled }) =>
    $scrollbarEnabled &&
    css`
      padding-top: 16px;
      padding-bottom: 16px;
    `}
`;
