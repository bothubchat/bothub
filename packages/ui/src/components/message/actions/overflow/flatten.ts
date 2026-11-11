import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  PropsWithChildren,
} from 'react';

/**
 * Раскладывает содержимое слота на отдельные действия: фрагменты и массивы
 * раскрываются, чтобы каждую кнопку можно было убрать в меню по одной
 */
export const flattenActions = (
  node: React.ReactNode,
  prefix = '',
): React.ReactNode[] =>
  Children.toArray(node).flatMap((child) => {
    if (!isValidElement<PropsWithChildren>(child)) {
      return [child];
    }

    // Ключи вложенных фрагментов совпали бы друг с другом
    const key = `${prefix}${child.key}`;

    return child.type === Fragment
      ? flattenActions(child.props.children, `${key}/`)
      : [cloneElement(child, { key })];
  });
