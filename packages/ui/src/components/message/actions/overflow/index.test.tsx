import { describe, test, expect } from 'vitest';
import { isValidElement } from 'react';
import { flattenActions, getVisibleCount } from '.';

// Кнопка 32 и зазор 2: место одной кнопки — 34
const fit = (available: number, total: number, hasMenu = true) =>
  getVisibleCount({ total, available, size: 32, gap: 2, hasMenu });

describe('getVisibleCount', () => {
  test('keeps every action while the row fits with the menu button', () => {
    // Пять действий и кнопка «ещё»: 6 × 32 + 5 × 2
    expect(fit(202, 5)).toBe(5);
    expect(fit(1000, 5)).toBe(5);
  });

  test('gives the place of the last fitting action to the menu button', () => {
    expect(fit(201, 5)).toBe(4);
    // Четыре кнопки с зазорами — 134: три действия и «ещё»
    expect(fit(134, 5)).toBe(3);
    expect(fit(133, 5)).toBe(2);
  });

  test('leaves only the menu button in a row that is too narrow', () => {
    expect(fit(40, 5)).toBe(0);
    expect(fit(0, 5)).toBe(0);
  });

  // Прятать одно действие ради кнопки «ещё» на его месте незачем
  test('hides at least two actions when the menu button appears for them', () => {
    // Пять действий без меню — 168
    expect(fit(168, 5, false)).toBe(5);
    expect(fit(167, 5, false)).toBe(3);
  });

  test('does not hide an action over a fraction of a pixel', () => {
    expect(fit(201.6, 5)).toBe(5);
  });

  test('keeps everything until the buttons are measured', () => {
    expect(
      getVisibleCount({
        total: 5,
        available: 0,
        size: 0,
        gap: 0,
        hasMenu: true,
      }),
    ).toBe(5);
  });
});

describe('flattenActions', () => {
  const getKeys = (nodes: React.ReactNode[]) =>
    nodes.map((node) => (isValidElement(node) ? node.key : null));

  test('takes the actions out of nested fragments one by one', () => {
    const actions = flattenActions(
      <>
        <>
          <button type="button">like</button>
          <button type="button">dislike</button>
        </>
        {null}
        <button type="button">speak</button>
      </>,
    );

    expect(actions).toHaveLength(3);
    expect(actions.every((action) => isValidElement(action))).toBe(true);
  });

  // Действия рисуются одним списком: одинаковые ключи перепутали бы кнопки
  test('gives every action its own key', () => {
    const keys = getKeys(
      flattenActions(
        <>
          <>
            <button type="button">like</button>
            <button type="button">dislike</button>
          </>
          <>
            <button type="button">speak</button>
          </>
        </>,
        'addon',
      ),
    );

    expect(new Set(keys).size).toBe(3);
    expect(keys.every((key) => key?.startsWith('addon'))).toBe(true);
  });

  test('returns nothing for an empty slot', () => {
    expect(flattenActions(null)).toEqual([]);
    expect(flattenActions(false)).toEqual([]);
  });
});
