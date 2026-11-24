import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { IconProvider } from '@/ui/components/icon';
import { ChatLineIcon, FolderLineIcon, TabChatsIcon } from '.';

const svgOf = (element: React.ReactElement) =>
  render(element).container.querySelector('svg');

describe('line icons', () => {
  test('are drawn with a round stroke of the current color', () => {
    const svg = svgOf(<ChatLineIcon />);

    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('stroke-width', '1.8');
    expect(svg).toHaveAttribute('stroke-linecap', 'round');
  });

  test('take the color of their parent: no color of their own', () => {
    const svg = svgOf(<FolderLineIcon />);

    expect(svg?.style.color).toBe('');
  });

  test('take the stroke color of an IconProvider', () => {
    const svg = svgOf(
      <IconProvider stroke="#4785FF">
        <ChatLineIcon />
      </IconProvider>,
    );

    expect(svg).toHaveStyle({ color: '#4785FF' });
  });

  test('let a filled icon take the fill color of an IconProvider', () => {
    const svg = svgOf(
      <IconProvider fill="#4785FF">
        <TabChatsIcon />
      </IconProvider>,
    );

    expect(svg).toHaveStyle({ color: '#4785FF' });
  });

  test('accept another stroke width', () => {
    const svg = svgOf(<ChatLineIcon strokeWidth={3} />);

    expect(svg).toHaveAttribute('stroke-width', '3');
  });
});
