import styled from 'styled-components';

export const ThreeDotsLoaderStyled = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 22px;
  height: 22px;

  & > div:nth-child(1) {
    animation-delay: 0.4s;
  }

  & > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  & > div:nth-child(3) {
    animation-delay: 0.0s;
  }
`;

export const ThreeDotsLoaderDotStyled = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  animation: threeDotsLoaderAnimation 1s infinite ease-in-out;

  @keyframes threeDotsLoaderAnimation {
    0% {
      background-color: ${({ theme }) => theme.colors.grayScale.gray3};
    }
    25% {
      background-color: ${({ theme }) => theme.colors.grayScale.gray2};
    }
    50% {
      background-color: ${({ theme }) => theme.colors.base.white};
    }
    75% {
      background-color: ${({ theme }) => theme.colors.grayScale.gray2};
    }
    100% {
      background-color: ${({ theme }) => theme.colors.grayScale.gray3};
    }
  }
`;
