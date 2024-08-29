import { ThreeDotsLoaderDotStyled, ThreeDotsLoaderStyled } from './styled';

export interface ThreeDotsLoaderProps {
  className?: string;
}

export const ThreeDotsLoader = (props: ThreeDotsLoaderProps) => (
  <ThreeDotsLoaderStyled className={props.className}>
    <ThreeDotsLoaderDotStyled />
    <ThreeDotsLoaderDotStyled />
    <ThreeDotsLoaderDotStyled />
  </ThreeDotsLoaderStyled>
);
