import { describe, expect, test } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { BothubStyleSheetManager } from '.';

const renderCss = (variant: 'main' | 'dashboard') => {
  const sheet = new ServerStyleSheet();
  try {
    renderToString(
      sheet.collectStyles(
        <BothubStyleSheetManager variant={variant}>
          <div />
        </BothubStyleSheetManager>,
      ),
    );
    return sheet.getStyleTags();
  } finally {
    sheet.seal();
  }
};

describe('BothubStyleSheetManager', () => {
  test('sets the scale variables of static styles on :root', () => {
    const css = renderCss('main');

    expect(css).toContain('--bothub-ui-scale-on:1;');
    expect(css).toContain('--bothub-ui-font-size-min:calc(12 * 1px);');
    expect(css).toContain('--bothub-ui-line-height-min:calc(16 * 1px);');
  });

  test('the dashboard variant has no minimum font size', () => {
    const css = renderCss('dashboard');

    expect(css).toContain('--bothub-ui-scale-on:1;');
    expect(css).not.toContain('--bothub-ui-font-size-min');
  });
});
