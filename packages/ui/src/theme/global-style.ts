import { createGlobalStyle } from 'styled-components';
import ibmPlexSansBold from '@/fonts/IBMPlexSans-Bold.ttf';
import ibmPlexSansSemiBold from '@/fonts/IBMPlexSans-SemiBold.ttf';
import ibmPlexSansMedium from '@/fonts/IBMPlexSans-Medium.ttf';
import ibmPlexSansRegular from '@/fonts/IBMPlexSans-Regular.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
    src: url(${ibmPlexSansBold});
  }
  @font-face {
    font-family: ${({ theme }) => theme.fonts.ibmPlexSans.semiBold};
    src: url(${ibmPlexSansSemiBold});
  }
  @font-face {
    font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
    src: url(${ibmPlexSansMedium});
  }
  @font-face {
    font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
    src: url(${ibmPlexSansRegular});
  }

  body {
    background: ${({ theme }) => theme.colors.base.black} !important;
  }
`;
