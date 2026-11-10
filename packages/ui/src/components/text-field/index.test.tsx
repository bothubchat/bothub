import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { useState } from 'react';
import { customRender, TestProvider } from '@/ui/tests';
import { THEMES } from '@/ui/theme';
import { TextField } from './index';

// jsdom doesn't get the styles injected, so read the generated CSS instead
const renderCss = (ui: React.ReactElement) => {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(
      sheet.collectStyles(
        <TestProvider
          theme={{
            scheme: 'custom',
            customTheme: { ...THEMES.standard.dark, scheme: 'custom' },
          }}
        >
          {ui}
        </TestProvider>,
      ),
    );
    return { html, css: sheet.getStyleTags() };
  } finally {
    sheet.seal();
  }
};

describe('TextField', () => {
  afterEach(() => {
    cleanup();
  });

  test('clear button reports the empty value through onChange', () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    const onClearButtonClick = vi.fn();

    const Controlled = () => {
      const [value, setValue] = useState('hello');

      return (
        <TextField
          aria-label="Search"
          clearable
          clearAriaLabel="Clear"
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setValue(event.target.value);
          }}
          onValueChange={onValueChange}
          onClearButtonClick={onClearButtonClick}
        />
      );
    };
    customRender(<Controlled />);

    fireEvent.click(screen.getByLabelText('Clear'));

    expect(onChange).toHaveBeenCalledWith('');
    expect(onValueChange).toHaveBeenCalledWith('');
    expect(onClearButtonClick).toHaveBeenCalledTimes(1);
    expect((screen.getByLabelText('Search') as HTMLInputElement).value).toBe(
      '',
    );
  });

  test('closes the icon rules in the custom scheme', () => {
    const { css } = renderCss(
      <TextField
        clearable
        value="hello"
      />,
    );

    expect(css).toContain('visibility:hidden');
    // Hover and focus styles keep the specificity of a single class
    expect(css).toMatch(/:where\(:hover, ?:focus-within\)\{border-color/);
    // The clear button rules used to end up inside the unclosed `svg path {`
    expect(css).not.toMatch(/svg path[^{]*\{[^}]*visibility/);
  });

  test('does not create a class for every typed color', () => {
    // jsdom has no CSS.supports, which the color preview needs
    vi.stubGlobal('CSS', { supports: () => true });
    const first = renderCss(
      <TextField
        type="color"
        value="#111111"
      />,
    );
    const second = renderCss(
      <TextField
        type="color"
        value="#222222"
      />,
    );

    vi.unstubAllGlobals();

    expect(first.html).toContain('background:#111111');
    expect(first.css).not.toContain('#111111');
    expect(second.css).not.toContain('#222222');
  });
});
