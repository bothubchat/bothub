import React from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { AcademyIcon } from './academy';
import { StarsGradientIcon } from './stars-gradient';
import { StarGradientIcon } from './star-gradient';
import { MaxLogoGradient } from './max-logo-gradient';

const REF_ATTRIBUTES = [
  'clip-path',
  'fill',
  'stroke',
  'mask',
  'filter',
  'href',
  'xlink:href',
  'style',
];

const getReferencedIds = (element: Element): string[] =>
  REF_ATTRIBUTES.flatMap((name) => {
    const value = element.getAttribute(name);
    if (!value) return [];
    const ids = [...value.matchAll(/url\(#([^)]+)\)/g)].map(([, id]) => id);
    if ((name === 'href' || name === 'xlink:href') && value.startsWith('#')) {
      ids.push(value.slice(1));
    }
    return ids;
  });

const expectSelfContainedIds = (container: HTMLElement, minSvgCount = 2) => {
  const svgs = [...container.querySelectorAll('svg')];
  expect(svgs.length).toBeGreaterThanOrEqual(minSvgCount);

  const ids = [...container.querySelectorAll('svg [id]')].map(({ id }) => id);
  expect(new Set(ids).size).toBe(ids.length);

  for (const svg of svgs) {
    const ownIds = new Set(
      [...svg.querySelectorAll('[id]')].map(({ id }) => id),
    );
    for (const element of svg.querySelectorAll('*')) {
      for (const id of getReferencedIds(element)) {
        expect(ownIds.has(id), `#${id} must be defined in the same svg`).toBe(
          true,
        );
      }
    }
  }
};

describe('icon ids', () => {
  afterEach(() => {
    cleanup();
  });

  test.each([
    ['AcademyIcon (clipPath)', AcademyIcon],
    ['StarsGradientIcon (linearGradient)', StarsGradientIcon],
    ['StarGradientIcon (default id)', StarGradientIcon],
    ['MaxLogoGradient (href)', MaxLogoGradient],
  ])(
    '%s renders unique, self-contained ids for every instance',
    (_, IconComponent) => {
      const { container } = customRender(
        <>
          <IconComponent style={{ display: 'none' }} />
          <IconComponent />
        </>,
      );

      expect(container.querySelectorAll('svg [id]').length).toBeGreaterThan(0);
      expectSelfContainedIds(container);
    },
  );

  test('StarGradientIcon keeps an explicit id', () => {
    const { container } = customRender(<StarGradientIcon id="custom" />);

    expect(container.querySelector('linearGradient')?.id).toBe('custom');
    expect(container.querySelector('path')?.getAttribute('fill')).toBe(
      'url(#custom)',
    );
  });

  test('every icon can be rendered twice without id collisions', () => {
    const modules = import.meta.glob<Record<string, unknown>>('./*/index.tsx', {
      eager: true,
    });
    const icons = Object.values(modules).flatMap((module) =>
      Object.values(module).filter(
        (value): value is React.FC => typeof value === 'function',
      ),
    );
    expect(icons.length).toBeGreaterThan(300);

    const { container } = customRender(
      <>
        {icons.map((IconComponent, index) => (
          <React.Fragment key={index}>
            <IconComponent />
            <IconComponent />
          </React.Fragment>
        ))}
      </>,
    );

    expectSelfContainedIds(container, icons.length * 2);
  });
});
