import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { customRender, TestProvider } from '@/ui/tests';
import { Notification, Notifications } from './index';

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

// jsdom has no AnimationEvent, so React listens to the prefixed event
const endAnimation = (element: HTMLElement) => {
  fireEvent.animationEnd(element);
  fireEvent(element, new Event('webkitAnimationEnd', { bubbles: true }));
};

const getProgressBar = (container: HTMLElement) =>
  container.querySelector<HTMLElement>('[style*="animation-duration"]');

describe('Notification', () => {
  afterEach(() => {
    cleanup();
  });

  test('does not render "0" when autoClose is 0', () => {
    const { container } = customRender(
      <Notification
        title="Saved"
        autoClose={0}
      />,
    );

    expect(container.textContent).toBe('Saved');
    expect(getProgressBar(container)).toBeNull();
  });

  test('closes when the progress animation ends', async () => {
    const onClose = vi.fn();
    const { container } = customRender(
      <Notification
        title="Saved"
        notificationId="saved"
        autoClose={3000}
        onClose={onClose}
      />,
    );

    const bar = getProgressBar(container)!;
    expect(bar.style.animationDuration).toBe('3000ms');

    endAnimation(bar);
    await waitFor(() => expect(onClose).toHaveBeenCalledWith('saved'));
    expect(screen.queryByText('Saved')).toBeNull();
  });

  test('animates the progress with a transform that pauses on hover', () => {
    const css = renderCss(
      <Notification
        title="Saved"
        autoClose={3000}
      />,
    );

    expect(css).toContain('transform:scaleX(1)');
    expect(css).toContain('animation-play-state:paused');
    expect(css).not.toContain('3000ms');
  });

  test('reports closing inside the list once, after the animation', async () => {
    const onClose = vi.fn();
    customRender(
      <Notifications>
        <Notification
          title="Saved"
          notificationId="saved"
          autoClose={false}
          closeAriaLabel="Close"
          onClose={onClose}
        />
      </Notifications>,
    );

    fireEvent.click(await screen.findByLabelText('Close'));
    expect(onClose).not.toHaveBeenCalled();

    await waitFor(() => expect(onClose).toHaveBeenCalledWith('saved'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('announces notifications in the list', async () => {
    customRender(
      <Notifications>
        <Notification title="Saved" />
      </Notifications>,
    );

    const status = await screen.findByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.textContent).toContain('Saved');
  });
});
