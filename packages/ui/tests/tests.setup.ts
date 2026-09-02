import '@testing-library/jest-dom/vitest';
import { afterAll, beforeAll, vi } from 'vitest';

class ResizeObserverMock {
  observe = () => {};

  unobserve = () => {};

  disconnect = () => {};
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;
}

const react19RefWarning = 'Accessing element.ref was removed in React 19.';
const originalConsoleError = globalThis.console.error.bind(globalThis.console);
const originalStderrWrite = process.stderr.write.bind(process.stderr);

beforeAll(() => {
  vi.spyOn(globalThis.console, 'error').mockImplementation(
    (...args: unknown[]) => {
      const hasReact19RefWarning = args.some(
        (arg) => typeof arg === 'string' && arg.includes(react19RefWarning),
      );

      if (hasReact19RefWarning) {
        return;
      }

      originalConsoleError(...args);
    },
  );

  vi.spyOn(process.stderr, 'write').mockImplementation((chunk, ...args) => {
    const output = typeof chunk === 'string' ? chunk : chunk.toString();

    if (output.includes(react19RefWarning)) {
      return true;
    }

    return originalStderrWrite(chunk, ...args);
  });
});

afterAll(() => {
  vi.restoreAllMocks();
});
