import { styled } from 'styled-components';

export const NotificationsStyled = styled.div`
  display: flex;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.notifications};
  bottom: 0px;
  right: 0px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  pointer-events: none;
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  gap: 20px;
`;
