import React from 'react';
import { Skeleton } from '@/ui/components/skeleton';

export interface FieldLabelProps {
  /** The field's own styled label. */
  as: React.ElementType;
  label: React.ReactNode;
  skeleton: boolean;
  /** Props of the label element when the label is text, e.g. its id. */
  labelProps?: Record<string, unknown>;
}

/**
 * The label of a form field: a skeleton while it loads, text in the field's
 * label element, or any node the caller renders itself.
 */
export const FieldLabel: React.FC<FieldLabelProps> = ({
  as: Label,
  label,
  skeleton,
  labelProps,
}) => (
  <>
    {label && skeleton && (
      <Label>
        <Skeleton width={100} />
      </Label>
    )}
    {typeof label === 'string' && !skeleton && (
      <Label {...labelProps}>{label}</Label>
    )}
    {typeof label !== 'string' && !skeleton && label}
  </>
);
