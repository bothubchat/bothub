import { describe, test, expect, afterEach, vi } from 'vitest';
import { Profiler } from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { DescriptionCard } from './index';

describe('DescriptionCard', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('tracks the pointer in CSS variables without rerendering', () => {
    const onRender = vi.fn();

    const { container } = customRender(
      <Profiler
        id="card"
        onRender={onRender}
      >
        <DescriptionCard
          title="Title"
          text="Text"
        />
      </Profiler>,
    );

    const card = container.firstElementChild as HTMLElement;
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 50,
    } as DOMRect);
    onRender.mockClear();

    fireEvent.mouseMove(card, { clientX: 130, clientY: 70 });

    expect(onRender).not.toHaveBeenCalled();
    expect(card.style.getPropertyValue('--description-card-hover-x')).toBe(
      '30px',
    );
    expect(card.style.getPropertyValue('--description-card-hover-y')).toBe(
      '20px',
    );

    fireEvent.mouseLeave(card);
    expect(card.style.getPropertyValue('--description-card-hover-x')).toBe('');
  });
});
