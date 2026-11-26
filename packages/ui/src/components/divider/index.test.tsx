import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Divider } from '.';
import { divider, dividerContainer } from './divider.css';

afterEach(() => {
  cleanup();
});

describe('divider', () => {
  test('a line without children', () => {
    const { container } = render(
      <Divider
        className="custom"
        style={{ height: 3 }}
      />,
    );
    const line = container.firstElementChild as HTMLElement;

    expect(container.childElementCount).toBe(1);
    expect(line).toHaveClass(divider, 'custom');
    expect(line.style.height).toBe('3px');
  });

  test('lines on both sides of the children, both get the props', () => {
    const { container, getByText } = render(
      <Divider className="custom">
        <span>or</span>
      </Divider>,
    );
    const wrapper = container.firstElementChild!;

    expect(wrapper).toHaveClass(dividerContainer);
    expect(wrapper.children).toHaveLength(3);
    expect(wrapper.children[0]).toHaveClass(divider, 'custom');
    expect(wrapper.children[2]).toHaveClass(divider, 'custom');
    expect(getByText('or').parentElement).toBe(wrapper);
  });

  test('renders no styled-components CSS', () => {
    const sheet = new ServerStyleSheet();
    try {
      renderToString(sheet.collectStyles(<Divider>text</Divider>));

      expect(sheet.getStyleTags()).toBe('');
    } finally {
      sheet.seal();
    }
  });
});
