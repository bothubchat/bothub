import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { TextAreaField } from './index';

describe('TextAreaField', () => {
  afterEach(() => {
    cleanup();
  });

  test('links the label and the error to the textarea', () => {
    customRender(
      <TextAreaField
        label="Prompt"
        error="Too long"
      />,
    );

    const textarea = screen.getByLabelText('Prompt');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea.getAttribute('aria-invalid')).toBe('true');

    const describedBy = textarea.getAttribute('aria-describedby')!;
    expect(document.getElementById(describedBy)?.textContent).toBe('Too long');
  });

  test('keeps aria attributes passed by the parent', () => {
    customRender(
      <>
        <span id="custom-label">Custom</span>
        <TextAreaField
          label="Prompt"
          aria-labelledby="custom-label"
        />
      </>,
    );

    expect(screen.getByLabelText('Custom').tagName).toBe('TEXTAREA');
  });
});
