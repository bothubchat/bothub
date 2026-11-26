import { describe, test, expect, afterEach, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Tooltip } from './index';
import { Button } from '../button';
import { getLoadedTooltipMarkdown } from './markdown-loader';

// Counts how many times the markdown chunk is imported. The loader state is
// shared by the tests of this file, so the plain tooltips go first.
const markdownChunk = vi.hoisted(() => ({ imports: 0 }));

vi.mock('./markdown', async (importOriginal) => {
  markdownChunk.imports += 1;
  return importOriginal();
});

const getTooltip = () =>
  document.querySelector<HTMLElement>('[role="tooltip"]');

describe('tooltip markdown', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('plain tooltips never load react-markdown', async () => {
    customRender(
      <>
        <Tooltip label="**Not** markdown">
          <Button>Plain</Button>
        </Tooltip>
        <Tooltip
          label={<strong>Element</strong>}
          markdown
        >
          <Button>Element</Button>
        </Tooltip>
      </>,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Plain' }));
    expect(screen.getByText('**Not** markdown')).not.toBeNull();

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Element' }));
    expect(screen.getByText('Element', { selector: 'strong' })).not.toBeNull();

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });

    expect(markdownChunk.imports).toBe(0);
    expect(getLoadedTooltipMarkdown()).toBeNull();
  });

  test('shows the text until the markdown is loaded, then the markdown', async () => {
    // jsdom has no layout: the tooltip is taller once the markdown is there.
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      function getBoundingClientRect(this: HTMLElement) {
        const isTooltip = this.getAttribute('role') === 'tooltip';
        const height = isTooltip && this.querySelector('strong') ? 60 : 20;

        return {
          x: 0,
          y: 100,
          top: 100,
          left: 0,
          right: 50,
          bottom: 100 + height,
          width: 50,
          height,
          toJSON: () => ({}),
        };
      },
    );

    customRender(
      <Tooltip
        label="**Bold** and `code`"
        placementY={0}
        markdown
      >
        <Button>Hover me</Button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    // Plain text while the chunk loads, placed by its height (100 - 20 - 6).
    expect(screen.getByText('**Bold** and `code`')).not.toBeNull();
    expect(getTooltip()!.style.top).toBe('74px');

    await waitFor(() => {
      expect(screen.getByText('Bold').tagName).toBe('STRONG');
    });
    expect(screen.getByText('code').tagName).toBe('CODE');
    expect(screen.queryByText('**Bold** and `code`')).toBeNull();
    // Placed again by the height of the markdown (100 - 60 - 6).
    expect(getTooltip()!.style.top).toBe('34px');
    expect(markdownChunk.imports).toBe(1);
  });

  test('renders the markdown right away once it is loaded', () => {
    customRender(
      <Tooltip
        label="**Loaded**"
        markdown
      >
        <Button>Hover me</Button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    expect(screen.getByText('Loaded').tagName).toBe('STRONG');
    expect(markdownChunk.imports).toBe(1);
  });
});
