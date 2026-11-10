import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { customRender, TestProvider } from '@/ui/tests';
import { Accordion } from './index';

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

describe('Accordion', () => {
  afterEach(() => {
    cleanup();
  });

  test('does not pass fullWidth to the DOM', () => {
    const { container } = customRender(
      <Accordion
        label="Question"
        fullWidth
      >
        Answer
      </Accordion>,
    );

    expect(container.querySelector('[fullwidth]')).toBeNull();
  });

  test('toggles with the mouse and the keyboard', () => {
    customRender(<Accordion label="Question">Answer</Accordion>);
    const head = screen.getByRole('button');

    expect(head.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(head);
    expect(head.getAttribute('aria-expanded')).toBe('true');
    const body = document.getElementById(head.getAttribute('aria-controls')!);
    expect(body?.textContent).toBe('Answer');

    fireEvent.keyDown(head, { key: 'Enter' });
    expect(head.getAttribute('aria-expanded')).toBe('false');
  });

  test('animates the height with grid rows instead of max-height: auto', () => {
    const css = renderCss(<Accordion label="Question">Answer</Accordion>);

    expect(css).not.toContain('max-height:auto');
    expect(css).toContain('grid-template-rows:0fr');
  });
});
