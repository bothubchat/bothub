import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const BulbIcon = icon(({ ...props }) => {
  const theme = useTheme();
  const fillColor = theme.colors.base.white;

  return (
    <Icon
      size={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ stroke = fillColor } = { stroke: fillColor }) => (
          <g id="surface1">
            <path
              d="M14.04 6.5C14.04 5.83 13.9 5.17 13.61 4.55C13.33 3.93 12.93 3.38 12.42 2.93C11.91 2.48 11.31 2.14 10.67 1.94C10.03 1.73 9.36 1.66 8.69 1.74C7.55 1.78 6.49 2.22 5.69 2.96C4.89 3.7 4.4 4.69 4.36 5.75C4.33 6.53 4.52 7.3 4.91 7.98C5.29 8.67 5.85 9.24 6.54 9.64C6.73 9.76 6.89 9.92 7.00 10.12C7.11 10.31 7.16 10.54 7.16 10.76V11.78H10.84V10.76C10.84 10.54 10.88 10.31 10.99 10.12C11.11 9.93 11.27 9.76 11.46 9.64C12.13 9.26 12.69 8.72 13.09 8.07C13.48 7.42 13.69 6.68 13.69 5.93"
              stroke={stroke}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.84 15.15C10.25 15.61 9.54 15.87 8.82 15.87C8.10 15.87 7.39 15.61 6.80 15.15"
              stroke={stroke}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </IconConsumer>
    </Icon>
  );
});
