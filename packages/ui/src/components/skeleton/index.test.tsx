import { useState } from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { act, cleanup } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { customRender } from '@/ui/tests';
import { Skeleton, SkeletonProps } from '.';
import { skeleton } from './skeleton.css';

const renderSkeleton = (props: SkeletonProps) => {
  const { container } = customRender(<Skeleton {...props} />);

  return container.firstElementChild as HTMLElement;
};

describe('skeleton', () => {
  afterEach(() => {
    cleanup();
  });

  test('passes sizes through custom properties', () => {
    const skeleton = renderSkeleton({ width: 120, height: '24' });

    expect(skeleton.style.getPropertyValue('--bothub-skeleton-width')).toBe(
      '120px',
    );
    expect(skeleton.style.getPropertyValue('--bothub-skeleton-height')).toBe(
      '24px',
    );
  });

  test('keeps css lengths given as strings', () => {
    const skeleton = renderSkeleton({ width: '100%', height: '2rem' });

    expect(skeleton.style.getPropertyValue('--bothub-skeleton-width')).toBe(
      '100%',
    );
    expect(skeleton.style.getPropertyValue('--bothub-skeleton-height')).toBe(
      '2rem',
    );
  });

  test('fullWidth wins over width', () => {
    const skeleton = renderSkeleton({ width: 120, fullWidth: true });

    expect(skeleton.style.getPropertyValue('--bothub-skeleton-width')).toBe(
      '100%',
    );
  });

  test('passes colors and opacity through custom properties', () => {
    const skeleton = renderSkeleton({
      colors: ['#ffffff'],
      opacity: [0.15, 0.45],
    });

    expect(
      skeleton.style.getPropertyValue('--bothub-skeleton-color-from'),
    ).toBe('#ffffff');
    expect(skeleton.style.getPropertyValue('--bothub-skeleton-color-to')).toBe(
      '',
    );
    expect(
      skeleton.style.getPropertyValue('--bothub-skeleton-opacity-from'),
    ).toBe('0.15');
    expect(
      skeleton.style.getPropertyValue('--bothub-skeleton-opacity-to'),
    ).toBe('0.45');
  });

  test('does not generate a class per width or color', () => {
    const setValue: { current: (value: number) => void } = {
      current: () => {},
    };
    const Host = () => {
      const [value, setValueState] = useState(1);
      setValue.current = setValueState;

      return (
        <Skeleton
          width={value}
          colors={[`#${value.toString(16).padStart(6, '0')}`]}
          opacity={[value / 100]}
        />
      );
    };

    const { container } = customRender(<Host />);
    const skeleton = container.firstElementChild as HTMLElement;
    const { className } = skeleton;

    for (let value = 2; value <= 20; value++) {
      act(() => setValue.current(value));

      expect(skeleton.className).toBe(className);
      expect(skeleton.style.getPropertyValue('--bothub-skeleton-width')).toBe(
        `${value}px`,
      );
    }
  });

  test('variants are classes, rounded by default', () => {
    const { variants } = skeleton.classNames;

    expect(renderSkeleton({})).toHaveClass(
      skeleton.classNames.base,
      variants.variant.rounded,
    );
    cleanup();
    expect(renderSkeleton({ variant: 'circular' })).toHaveClass(
      variants.variant.circular,
    );
    cleanup();
    expect(renderSkeleton({ variant: 'rectangular' })).toHaveClass(
      variants.variant.rectangular,
    );
  });

  test('keeps the className of a styled() wrapper', () => {
    expect(renderSkeleton({ className: 'custom' })).toHaveClass(
      'custom',
      skeleton.classNames.base,
    );
  });

  test('renders no styled-components CSS', () => {
    const sheet = new ServerStyleSheet();
    try {
      renderToString(sheet.collectStyles(<Skeleton width={10} />));

      expect(sheet.getStyleTags()).toBe('');
    } finally {
      sheet.seal();
    }
  });
});
