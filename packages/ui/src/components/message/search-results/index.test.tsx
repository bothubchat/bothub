import { useState } from 'react';
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import {
  MessageSearchResults,
  MessageSearchResultsItemType,
  MessageSearchResultsProps,
} from '.';

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

const result = (name: string, url: string): MessageSearchResultsItemType => ({
  url,
  name,
  title: `Title ${name}`,
  date: '2026-01-01',
  content: `Content ${name}`,
});

const PDF_A = result('A', 'https://bothub.chat/a.pdf');
const PDF_B = result('B', 'https://bothub.chat/b.pdf');
const PAGE_C = result('C', 'https://bothub.chat/c');

const getItem = (container: HTMLElement, name: string) =>
  Array.from(container.querySelectorAll('[data-source-title]')).find(
    (title) => title.textContent === `Title ${name}`,
  )!.parentElement!;

// The download button is the only element after the result number.
const getDownloadButton = (item: HTMLElement) =>
  item.querySelector('[data-source-number]')!.parentElement!
    .nextElementSibling as HTMLElement | null;

describe('MessageSearchResults', () => {
  let setProps: (props: Partial<MessageSearchResultsProps>) => void;

  const renderResults = (props: MessageSearchResultsProps) => {
    const Parent = () => {
      const [state, set] = useState(props);
      setProps = (next) => set((prev) => ({ ...prev, ...next }));
      return <MessageSearchResults {...state} />;
    };

    return customRender(<Parent />);
  };

  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test('shows the download button for every url matching a global regex', () => {
    const { container } = renderResults({
      results: [PDF_A, PDF_B, PAGE_C],
      regexFilterDownloadHandler: /\.pdf$/g,
      pendingMessage: false,
    });

    expect(getDownloadButton(getItem(container, 'A'))).not.toBeNull();
    expect(getDownloadButton(getItem(container, 'B'))).not.toBeNull();
    expect(getDownloadButton(getItem(container, 'C'))).toBeNull();
  });

  test('calls the latest download handler with the result and its index', () => {
    const firstHandler = vi.fn();
    const lastHandler = vi.fn();
    const { container } = renderResults({
      results: [PDF_A, PDF_B],
      regexFilterDownloadHandler: /\.pdf$/,
      downloadHandler: firstHandler,
      pendingMessage: false,
    });

    act(() => setProps({ downloadHandler: lastHandler }));
    fireEvent.click(getDownloadButton(getItem(container, 'B'))!);

    expect(firstHandler).not.toHaveBeenCalled();
    expect(lastHandler).toHaveBeenCalledWith(PDF_B, 1);
  });

  test('keeps the item of a result when the results are reordered', () => {
    const { container } = renderResults({
      results: [PDF_A, PDF_B],
      pendingMessage: false,
    });
    const item = getItem(container, 'A');

    act(() => setProps({ results: [PDF_B, PDF_A] }));

    expect(getItem(container, 'A')).toBe(item);
  });

  test('renders results with the same url without key warnings', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = renderResults({
      results: [PDF_A, { ...PDF_A, name: 'A2', title: 'Title A2' }],
      pendingMessage: false,
    });

    expect(container.querySelectorAll('[data-source-title]')).toHaveLength(2);
    expect(error).not.toHaveBeenCalled();
  });
});
