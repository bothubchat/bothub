import { describe, test, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as StyledComponents from 'styled-components';
import { css, styled } from 'styled-components';
import { customRender } from '@/ui/tests';
import { Container } from '@/ui/components/container';
import { defaultTheme } from '@/ui/theme';
import { adaptive } from './index';

type StyledComponentsPrivate = {
  __PRIVATE__: { mainSheet: { toString: () => string } };
};

// In jsdom styled-components keeps the styles in its own sheet.
const getStyles = (): string =>
  // eslint-disable-next-line no-underscore-dangle
  (
    StyledComponents as unknown as StyledComponentsPrivate
  ).__PRIVATE__.mainSheet.toString();

describe('adaptive', () => {
  afterEach(() => {
    cleanup();
  });

  test('applies miniTablet styles without tablet styles', () => {
    const MiniTabletOnly = styled.div`
      ${adaptive({
        variant: 'dashboard',
        miniTablet: css`
          outline-offset: 7px;
        `,
      })}
    `;

    customRender(<MiniTabletOnly />);

    const { miniTablet, mobile } = defaultTheme.dashboard;
    expect(getStyles()).toMatch(
      new RegExp(
        `@media \\(min-width: ?${parseInt(mobile.maxWidth) + 1}px\\) and \\(max-width: ?${miniTablet.maxWidth}\\) ?\\{[^}]*outline-offset: ?7px`,
      ),
    );
  });
});

describe('Container', () => {
  afterEach(() => {
    cleanup();
  });

  test('uses the tablet padding below the tablet breakpoint', () => {
    customRender(<Container />);

    expect(getStyles()).toMatch(
      new RegExp(
        `@media \\(max-width: ?${defaultTheme.tablet.maxWidth}\\) ?\\{[^}]*padding: ?0px 30px`,
      ),
    );
  });
});
