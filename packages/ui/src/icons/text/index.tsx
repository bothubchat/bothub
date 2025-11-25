import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const TextIcon = icon(({ ...props }) => {
  const theme = useTheme();

  const fillColor = theme.colors.grayScale.gray2;

  return (
    <Icon
      viewBox="0 0 60 46"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ fill = fillColor } = { fill: fillColor }) => (
          <svg
            width="60"
            height="46"
            viewBox="0 0 60 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.23438 29H52.2344H2.23438ZM2.23438 19.6538H62.2344H2.23438ZM2.23438 10.8269H39.7344H2.23438ZM2.23438 2H54.866H2.23438Z"
              fill={fill}
            />
            <path
              d="M2.23438 29H52.2344M2.23438 19.6538H62.2344M2.23438 10.8269H39.7344M2.23438 2H54.866M2.43359 38.5H62.4336M2.23438 48H52.2344"
              stroke={fill}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </IconConsumer>
    </Icon>
  );
});
