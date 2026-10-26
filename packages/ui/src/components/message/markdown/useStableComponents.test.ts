import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MessageComponentsProps } from '@/ui/components/message/components';
import { isSameComponents, useStableComponents } from './useStableComponents';

const buttons = () => null;

describe('isSameComponents', () => {
  test('compares the values of code, document and image', () => {
    expect(
      isSameComponents(
        { code: { copyLabel: 'Копировать' }, image: { buttons } },
        { code: { copyLabel: 'Копировать' }, image: { buttons } },
      ),
    ).toBe(true);
    expect(isSameComponents({}, {})).toBe(true);
  });

  test.each<[string, MessageComponentsProps]>([
    ['another value', { code: { copyLabel: 'Скопировать' } }],
    ['another key', { code: { copyLabel: 'Копировать', onlyCode: true } }],
    ['another component', { code: { copyLabel: 'Копировать' }, image: {} }],
    ['no value', {}],
  ])('finds %s', (_, components) => {
    expect(
      isSameComponents({ code: { copyLabel: 'Копировать' } }, components),
    ).toBe(false);
  });

  test('compares functions by identity', () => {
    expect(
      isSameComponents(
        { image: { buttons } },
        { image: { buttons: () => null } },
      ),
    ).toBe(false);
  });
});

describe('useStableComponents', () => {
  test('keeps the previous object while the values are the same', () => {
    const { result, rerender } = renderHook(useStableComponents, {
      initialProps: { document: { copyLabel: 'Копировать' } },
    });
    const first = result.current;

    rerender({ document: { copyLabel: 'Копировать' } });
    expect(result.current).toBe(first);

    const next = { document: { copyLabel: 'Скопировать' } };
    rerender(next);
    expect(result.current).toBe(next);
  });
});
