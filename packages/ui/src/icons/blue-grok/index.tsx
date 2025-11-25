import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const BlueGrokIcon = icon(({ ...props }) => {
  const theme = useTheme();
  const fillColor = theme.colors.accent.primary;

  return (
    <Icon
      size={40}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ fill = fillColor } = { fill: fillColor }) => (
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.120117"
              y="0.333008"
              width="40"
              height="40"
              rx="20"
              fill={fill}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.9753 16.7513L25.1342 32.5558H20.1742L9.01532 16.7513H13.9753ZM13.9709 25.5291L16.452 29.0447L13.9731 32.5558H9.00977L13.9709 25.5291ZM31.232 9.86911V32.5558H27.1664V15.6269L31.232 9.86911ZM31.232 8.11133L20.1742 23.7724L17.6931 20.258L26.2687 8.11133H31.232Z"
              fill="white"
            />
          </svg>
        )}
      </IconConsumer>
    </Icon>
  );
});
