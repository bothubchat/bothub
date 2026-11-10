import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { RangeSettings } from './index';

describe('RangeSettings', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders the documented toggle next to the slider', () => {
    customRender(<RangeSettings toggle={<span>Toggle</span>} />);

    expect(screen.getByText('Toggle')).not.toBeNull();
    expect(screen.getByRole('slider')).not.toBeNull();
  });

  test('keeps the className on the slider without a toggle', () => {
    const { container } = customRender(<RangeSettings className="custom" />);

    expect(container.querySelector('.custom.rc-slider')).not.toBeNull();
  });
});
