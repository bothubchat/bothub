import styled from "styled-components";

export const HeaderMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: ${({ theme }) => theme.header.height};
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: ${({ theme }) => theme.colors.base.black};
  padding: 42px 40px;
  gap: 30px;
  @media not (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    top: ${({ theme }) => theme.header.mobile.height};
  }
`;
