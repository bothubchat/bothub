import { styled } from 'styled-components';
import { Scrollbar } from '../scrollbar';
import { MenuPosition } from './types';

const transformOriginByPosition: Record<MenuPosition, string> = {
  left: 'top left',
  right: 'top right',
  center: 'top center',
};

export const MenuRoot = styled.div`
  position: relative;
  display: inline-flex;
`;

export const MenuTriggerWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const MenuContent = styled.div<{
  $visible?: boolean;
  $position?: MenuPosition;
  $disablePortal?: boolean;
}>`
  position: ${({ $disablePortal }) => ($disablePortal ? 'absolute' : 'fixed')};
  z-index: ${({ theme }) => theme.zIndex.select};
  width: max-content;
  max-width: calc(100vw - 16px);
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.grayScale.gray7};
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'scale(1)' : 'scale(0.98)')};
  transform-origin: ${({ $position = 'left' }) =>
    transformOriginByPosition[$position]};
  transition:
    opacity 0.135s ease,
    transform 0.135s ease;
`;

export const MenuContentScrollbarWrapper = styled(Scrollbar).attrs({
  variant: 'secondary',
})`
  width: max-content;
  max-width: calc(100vw - 16px);
  max-height: min(400px, calc(100vh - 16px));
`;

export const MenuContentInner = styled.div`
  padding: 8px;
  width: max-content;
  max-width: calc(100vw - 32px);
`;
