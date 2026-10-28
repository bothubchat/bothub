import { describe, test, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { TestProvider } from '@/ui/tests';
import { BadgeSelectDropdownTrigger } from './styled';

// jsdom doesn't get the styles injected, so read the generated CSS instead
const renderCss = (ui: React.ReactElement) => {
  const sheet = new ServerStyleSheet();
  try {
    renderToString(sheet.collectStyles(<TestProvider>{ui}</TestProvider>));
    return sheet.getStyleTags();
  } finally {
    sheet.seal();
  }
};

describe('BadgeSelectDropdownTrigger', () => {
  test('uses colorButtonOpened while open', () => {
    const css = renderCss(
      <BadgeSelectDropdownTrigger
        $active
        $variant="primary"
        $colorButtonOpened="rgb(255, 0, 0)"
      >
        Model
      </BadgeSelectDropdownTrigger>,
    );

    expect(css).toContain('background:rgb(255, 0, 0);');
  });
});
