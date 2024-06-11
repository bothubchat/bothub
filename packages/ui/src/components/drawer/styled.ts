import { styled } from 'styled-components';
import { Typography } from '../typography';

export const Overlay = styled.div`
  position: fixed;
  pointer-events: auto;
  width: 100%;
  height: 100%;
  inset: 0;
  background-color: rgba(0, 0, 0, .65);
  transition: opacity .2s linear;
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
  opacity: 0;
  &._opened {
    opacity: 1;
  }
`;

export const Component = styled.div`
  padding: 56px 20px 20px 20px;
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
  background-color: ${(props) => props.theme.colors.grayScale.gray4};
  height: 100%;
  position: fixed;
  top: 0;
  width: 470px;
  right: -470px;
  transition: transform .2s linear;
  &._opened {
    transform: translateX(-100%);
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    width: 100%;
    right: -100%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

export const Title = styled(Typography).attrs({
  variant: 'body-xl-semibold'
})``;

export const CloseButton = styled.button`
  margin-left: auto;
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Content = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: calc(100% - 2rem);
  padding-bottom: 2.4rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
