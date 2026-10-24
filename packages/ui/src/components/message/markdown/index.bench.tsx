import React, { useState } from 'react';
import { afterAll, beforeAll, bench, describe, vi } from 'vitest';
import { act, cleanup, waitFor } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageProvider } from '../context';
import { MessageMarkdown } from '.';
import { createLongAnswer } from './long-answer';

/*
 * yarn vitest bench --run packages/ui/src/components/message/markdown
 *
 * The server sends the whole accumulated answer up to 10 times a second, so a
 * 20 KB answer arrives as ~330 updates of ~60 characters. jsdom and development
 * React make the numbers several times higher than in a browser: compare runs
 * with each other, not with production.
 */
const CHUNK_SIZE = 60;
const answers = {
  'text, code and tables': createLongAnswer(20_000),
  'with formulas': createLongAnswer(20_000, true),
};

let setAnswer: (text: string, typing: boolean) => void = () => {};

const StreamedAnswer = () => {
  const [{ text, typing }, setState] = useState({ text: '', typing: true });
  setAnswer = (text, typing) => setState({ text, typing });

  return (
    <MessageProvider
      variant="assistant"
      color="default"
      typing={typing}
    >
      <MessageMarkdown>{text}</MessageMarkdown>
    </MessageProvider>
  );
};

const update = (text: string, typing = true) =>
  act(() => setAnswer(text, typing));

const streamAnswer = async (answer: string) => {
  // Lets vitest talk to its worker between long synchronous runs.
  await new Promise((resolve) => {
    setTimeout(resolve);
  });
  update('');
  for (let length = CHUNK_SIZE; length < answer.length; length += CHUNK_SIZE) {
    update(answer.slice(0, length));
  }
  update(answer, false);
};

beforeAll(async () => {
  // highlight.js logs warnings with the whole element: printing them would be
  // measured instead of rendering.
  vi.spyOn(console, 'log').mockImplementation(() => {});
  customRender(<StreamedAnswer />);
  // Code highlighting is a lazy chunk: load it before measuring.
  update('```ts\nconst a = 1;\n```', false);
  await waitFor(() => {
    if (!document.querySelector('.hljs')) throw new Error('not highlighted');
  });
});

afterAll(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('stream a 20 KB answer chunk by chunk', () => {
  Object.entries(answers).forEach(([name, answer]) => {
    bench(name, () => streamAnswer(answer), {
      time: 0,
      iterations: 2,
      warmupIterations: 0,
    });
  });
});

describe('one chunk at the end of a 20 KB answer', () => {
  Object.entries(answers).forEach(([name, answer]) => {
    const shorter = answer.slice(0, -CHUNK_SIZE);
    let isLong = false;

    bench(
      name,
      () => {
        isLong = !isLong;
        update(isLong ? answer : shorter);
      },
      { time: 0, iterations: 30, setup: () => update(shorter) },
    );
  });
});

describe('render a finished 20 KB answer', () => {
  Object.entries(answers).forEach(([name, answer]) => {
    bench(
      name,
      () => {
        update('', false);
        update(answer, false);
      },
      { time: 0, iterations: 30 },
    );
  });
});
