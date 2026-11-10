import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React, { Profiler, useEffect } from 'react';
import { customRender, TestProvider } from '@/ui/tests';
import { Sidebar, SidebarChat, SidebarToggleButton, useSidebar } from '.';

const ROW_COUNT = 30;

const lifecycle = { mounts: 0, unmounts: 0 };

const MountCounter: React.FC = () => {
  useEffect(() => {
    lifecycle.mounts += 1;
    return () => {
      lifecycle.unmounts += 1;
    };
  }, []);

  return <span />;
};

const rows = Array.from({ length: ROW_COUNT }, (_, index) => (
  <SidebarChat
    key={index}
    id={`chat-${index}`}
    name={`Chat ${index}`}
    icon={<MountCounter />}
    actions={<MountCounter />}
    data-testid="row"
  />
));

describe('Sidebar', () => {
  beforeEach(() => {
    lifecycle.mounts = 0;
    lifecycle.unmounts = 0;
    // jsdom has no ResizeObserver, the scrollbar needs it
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}

        unobserve() {}

        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('keeps the chat rows mounted when it collapses and expands', () => {
    customRender(
      <Sidebar
        isOpenOnTablet={false}
        toggle={<SidebarToggleButton />}
      >
        {rows}
      </Sidebar>,
    );
    const rowsBefore = screen.getAllByTestId('row');
    expect(lifecycle).toEqual({ mounts: ROW_COUNT * 2, unmounts: 0 });

    fireEvent.click(screen.getByRole('button', { expanded: true }));
    expect(screen.getByRole('button', { expanded: false })).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { expanded: false }));

    expect(lifecycle).toEqual({ mounts: ROW_COUNT * 2, unmounts: 0 });
    const rowsAfter = screen.getAllByTestId('row');
    rowsAfter.forEach((row, index) => expect(row).toBe(rowsBefore[index]));
  });

  test('keeps the chat rows mounted when the open prop changes', () => {
    const renderSidebar = (open: boolean) => (
      <TestProvider>
        <Sidebar
          open={open}
          isOpenOnTablet={false}
        >
          {rows}
        </Sidebar>
      </TestProvider>
    );
    const { rerender } = render(renderSidebar(true));
    const rowsBefore = screen.getAllByTestId('row');

    rerender(renderSidebar(false));
    rerender(renderSidebar(true));

    expect(lifecycle).toEqual({ mounts: ROW_COUNT * 2, unmounts: 0 });
    screen
      .getAllByTestId('row')
      .forEach((row, index) => expect(row).toBe(rowsBefore[index]));
  });

  test("doesn't re-render the chat rows when it collapses and expands", () => {
    let rowCommits = 0;
    customRender(
      <Sidebar
        isOpenOnTablet={false}
        toggle={<SidebarToggleButton />}
      >
        <Profiler
          id="rows"
          onRender={() => {
            rowCommits += 1;
          }}
        >
          {rows}
        </Profiler>
      </Sidebar>,
    );
    const commitsAfterMount = rowCommits;

    fireEvent.click(screen.getByRole('button', { expanded: true }));
    expect(document.querySelector('[data-sidebar-collapsed]')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { expanded: false }));

    expect(rowCommits).toBe(commitsAfterMount);
  });

  test('shows the chat name next to a collapsed row only', async () => {
    const renderSidebar = (open: boolean) => (
      <TestProvider>
        <Sidebar
          open={open}
          isOpenOnTablet={false}
        >
          <SidebarChat
            id="chat"
            name="Plans"
            data-testid="row"
          />
        </Sidebar>
      </TestProvider>
    );
    const { rerender } = render(renderSidebar(true));
    fireEvent.mouseEnter(screen.getByTestId('row'));
    expect(screen.queryByRole('tooltip')).toBeNull();
    fireEvent.mouseLeave(screen.getByTestId('row'));

    rerender(renderSidebar(false));
    // The name stays in the row for screen readers
    expect(screen.getByTestId('row')).toHaveTextContent('Plans');
    fireEvent.mouseEnter(screen.getByTestId('row'));
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toHaveTextContent('Plans'),
    );
  });

  test('switches the rows to the edit mode', () => {
    const EditMode: React.FC = () => {
      const { setIsEdit } = useSidebar();
      useEffect(() => setIsEdit(true), [setIsEdit]);

      return null;
    };
    customRender(
      <Sidebar isOpenOnTablet={false}>
        <EditMode />
        <SidebarChat
          id="chat"
          name="Plans"
          dragAriaLabel="Drag the chat"
          checkbox={<input type="checkbox" />}
          actions={<button type="button">Actions</button>}
        />
      </Sidebar>,
    );

    expect(screen.getByLabelText('Drag the chat')).toHaveTextContent('Plans');
    expect(screen.getByRole('checkbox')).not.toBeNull();
    expect(screen.queryByText('Actions')).toBeNull();
  });

  test("doesn't re-render the context readers when nothing in it changes", () => {
    let renders = 0;
    const Reader: React.FC = () => {
      useSidebar();
      renders += 1;

      return null;
    };
    const reader = <Reader />;
    const renderSidebar = (className: string) => (
      <TestProvider>
        <Sidebar
          className={className}
          isOpenOnTablet={false}
        >
          {reader}
        </Sidebar>
      </TestProvider>
    );
    const { rerender } = render(renderSidebar('first'));
    // The second render picks up the scroll container from the ref
    rerender(renderSidebar('first'));
    const rendersBefore = renders;

    rerender(renderSidebar('second'));
    rerender(renderSidebar('third'));

    expect(renders).toBe(rendersBefore);
  });
});
