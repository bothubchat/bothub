import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Button } from '@/ui/components/button';
import { AdaptiveButton } from './index';

const classesOf = (text: string) =>
  [...screen.getByText(text).closest('button')!.classList].filter(
    (name) => !name.startsWith('sc-'),
  );

describe('AdaptiveButton', () => {
  afterEach(() => {
    cleanup();
  });

  test('passes variant and size to the button', () => {
    customRender(
      <>
        <Button
          variant="secondary"
          size="md"
        >
          Secondary
        </Button>
        <Button>Primary</Button>
        <AdaptiveButton
          variant="secondary"
          size="md"
        >
          Adaptive
        </AdaptiveButton>
      </>,
    );

    const adaptive = classesOf('Adaptive');
    // The button styles are generated from variant and size, so the adaptive
    // button gets the same class as a plain secondary button
    expect(adaptive).toEqual(expect.arrayContaining(classesOf('Secondary')));
    expect(adaptive).not.toEqual(expect.arrayContaining(classesOf('Primary')));
  });
});
