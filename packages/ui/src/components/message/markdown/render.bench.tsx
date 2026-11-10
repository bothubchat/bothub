// @vitest-environment node
import React from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import { bench, describe } from 'vitest';
import { createLongAnswer } from '@/ui/tests';
import { BothubUIProvider } from '@/ui/provider';
import { MessageProvider } from '../context';
import { MessageMarkdown } from '.';
import { getMarkdownPlugins } from './useMarkdownPlugins';

/*
 * NODE_ENV=production yarn vitest bench --run packages/ui/src/components/message/markdown/render.bench.tsx
 *
 * Server render of a 5 KB answer without formulas: what one message costs to
 * mount, without the DOM. react-markdown alone is the floor: the same plugins
 * and no components. A new `componentsOverride` object every time skips the
 * cache of parsed blocks, so that case parses and renders; the last one only
 * renders the cached blocks, which is the cost of the components.
 */
const answer = createLongAnswer(5_000);
const { remarkPlugins, rehypePlugins } = getMarkdownPlugins(false);
const options = { time: 4000, warmupTime: 1000 };

const renderMessage = (markdown: React.ReactNode) =>
  renderToString(
    <BothubUIProvider disableGlobalStyle>
      <MessageProvider
        variant="assistant"
        color="default"
        typing={false}
      >
        {markdown}
      </MessageProvider>
    </BothubUIProvider>,
  );

describe(`render a ${Math.round(answer.length / 1000)} KB answer to a string`, () => {
  bench(
    'react-markdown without components',
    () => {
      renderToString(
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
        >
          {answer}
        </ReactMarkdown>,
      );
    },
    options,
  );

  bench(
    'MessageMarkdown, parse and render',
    () => {
      renderMessage(
        <MessageMarkdown componentsOverride={{}}>{answer}</MessageMarkdown>,
      );
    },
    options,
  );

  bench(
    'MessageMarkdown, render parsed blocks',
    () => {
      renderMessage(<MessageMarkdown>{answer}</MessageMarkdown>);
    },
    options,
  );
});
