import type { Link } from 'react-router-dom';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body-xxl-semibold' | 'body-xl-semibold' | 'body-m-semibold' | 'body-m-medium' | 'body-m-regular' | 'body-s-medium' | 'body-xs-regular' | 'button-sm' | 'button-md' | 'input-md' | 'input-sm';

export type TypographyComponent = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div' | 'a' | typeof Link;
