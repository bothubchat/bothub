import { describe, test, expect, afterEach, beforeAll, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { LangSwitcher, LangSwitcherProps } from './index';

const props: LangSwitcherProps = {
  lang: { label: 'Language:', value: 'RU' },
  region: { label: 'Region:', value: 'RU' },
  dataRegions: [
    { value: 'RU', label: 'Russia' },
    { value: 'KZ', label: 'Kazakhstan' },
  ],
  dataLanguages: [
    { value: 'RU', label: 'Russian' },
    { value: 'EN', label: 'English' },
  ],
  onChange: () => {},
};

const countClickListeners = (spy: ReturnType<typeof vi.spyOn>) =>
  spy.mock.calls.filter(([type]) => type === 'click').length;

describe('LangSwitcher', () => {
  beforeAll(() => {
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
    vi.restoreAllMocks();
  });

  test('listens to document clicks only while open', async () => {
    const documentSpy = vi.spyOn(document, 'addEventListener');

    customRender(<LangSwitcher {...props} />);
    expect(countClickListeners(documentSpy)).toBe(0);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Language:')).not.toBeNull();
    expect(countClickListeners(documentSpy)).toBe(1);

    fireEvent.click(document.body);
    await waitFor(() => expect(screen.queryByText('Language:')).toBeNull());
  });

  test('renders the dropdown without a list element', () => {
    const { container } = customRender(<LangSwitcher {...props} />);

    fireEvent.click(screen.getByRole('button'));

    expect(container.querySelector('ul')).toBeNull();
  });

  test('changes the language from the inner select', () => {
    const onChange = vi.fn();

    customRender(
      <LangSwitcher
        {...props}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(document.querySelector('[data-test="lang-select"]')!);
    fireEvent.click(document.querySelector('[data-test="English"]')!);

    expect(onChange).toHaveBeenCalledWith({ lang: 'EN', region: 'RU' });
  });
});
