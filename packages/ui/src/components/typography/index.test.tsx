import React from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, styled } from 'styled-components';
import { Typography } from '.';
import { getTypographyStyles } from './mixin';
import { typography, typographyClassName } from './typography.css';
import { typographyVariantStyles } from './variants';

const { variants } = typography.classNames;

afterEach(() => {
  cleanup();
});

describe('typography', () => {
  test('builds the styles of a variant once', () => {
    expect(getTypographyStyles('body-m-medium')).toBe(
      getTypographyStyles('body-m-medium'),
    );
    expect(getTypographyStyles('h1')).not.toBe(
      getTypographyStyles('body-m-medium'),
    );
  });

  test('renders a span with the default classes', () => {
    const { container } = render(<Typography>text</Typography>);
    const element = container.firstElementChild!;

    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass(
      typographyClassName,
      variants.variant['body-m-medium'],
      variants.align.left,
    );
    expect(element).not.toHaveClass(variants.fullWidth.true);
  });

  test('every variant has a class', () => {
    Object.keys(typographyVariantStyles).forEach((variant) => {
      const { container } = render(
        <Typography variant={variant as keyof typeof variants.variant} />,
      );

      expect(container.firstElementChild).toHaveClass(
        variants.variant[variant as keyof typeof variants.variant],
      );
      cleanup();
    });
  });

  test('align, fullWidth and component', () => {
    const { container } = render(
      <Typography
        variant="h3"
        align="center"
        fullWidth
        component="a"
        href="/path"
      >
        link
      </Typography>,
    );
    const element = container.firstElementChild!;

    expect(element.tagName).toBe('A');
    expect(element).toHaveAttribute('href', '/path');
    expect(element).toHaveClass(
      variants.variant.h3,
      variants.align.center,
      variants.fullWidth.true,
    );
  });

  test('a function component gets the classes and the props', () => {
    const Custom: React.FC<{ className?: string; title?: string }> = (
      props,
    ) => (
      <em
        data-testid="custom"
        {...props}
      />
    );
    const { getByTestId } = render(
      <Typography
        component={Custom}
        title="hint"
      />,
    );

    expect(getByTestId('custom')).toHaveClass(typographyClassName);
    expect(getByTestId('custom')).toHaveAttribute('title', 'hint');
  });

  test('passes className, style, ref and DOM props through', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const { container } = render(
      <Typography
        ref={ref}
        className="custom"
        style={{ color: 'red' }}
        id="id"
        data-test="value"
      />,
    );
    const element = container.firstElementChild as HTMLElement;

    expect(ref.current).toBe(element);
    expect(element).toHaveClass('custom', typographyClassName);
    expect(element.style.color).toBe('red');
    expect(element).toHaveAttribute('id', 'id');
    expect(element).toHaveAttribute('data-test', 'value');
  });

  test('a styled() wrapper adds its class, `forwardedAs` does not reach the DOM', () => {
    const Wrapped = styled(Typography)`
      color: red;
    `;
    const { container } = render(
      <Wrapped
        variant="h2"
        forwardedAs="h1"
      />,
    );
    const element = container.firstElementChild!;

    expect(element.tagName).toBe('SPAN');
    expect(element).not.toHaveAttribute('as');
    expect(element).toHaveClass(variants.variant.h2);
    expect(element.classList.length).toBeGreaterThan(
      typography({ variant: 'h2' }).split(' ').length,
    );
  });

  test('renders no styled-components CSS', () => {
    const sheet = new ServerStyleSheet();
    try {
      const html = renderToString(
        sheet.collectStyles(
          <Typography variant="h1">
            <Typography component="p">nested</Typography>
          </Typography>,
        ),
      );

      expect(html).toContain(variants.variant.h1);
      expect(sheet.getStyleTags()).toBe('');
    } finally {
      sheet.seal();
    }
  });
});
