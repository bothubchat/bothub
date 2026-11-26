import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/ui/theme/contract.css';
import { scaled } from '@/ui/styles/zero-runtime/scale';

export const dividerContainer = style(
  scaled({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    width: '100%',
    padding: '2px 0',
  }),
);

globalStyle(`${dividerContainer} *`, {
  color: vars.colors.grayScale.gray1,
});

export const divider = style({
  display: 'flex',
  width: '100%',
  height: '1px',
  background: vars.colors.grayScale.gray2,
});
