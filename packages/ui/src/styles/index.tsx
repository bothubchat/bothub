import './style.css';
import { createGlobalStyle } from 'styled-components';
import { ScrollbarStyle } from '../components/scrollbar';

export const PageScrollbar = createGlobalStyle`
  body {
    ${ScrollbarStyle}
  }
`;
