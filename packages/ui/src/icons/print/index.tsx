import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const PrintIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.colors.base.white } = { fill: theme.colors.base.white }
        ) => (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.75 3.75C3.75 3.33579 4.08579 3 4.5 3H13.5C13.9142 3 14.25 3.33579 14.25 3.75V8.25C15.4927 8.25 16.5 9.25732 16.5 10.5V13.5C16.5 14.7427 15.4927 15.75 14.25 15.75H3.75C2.50735 15.75 1.5 14.7427 1.5 13.5V10.5C1.5 9.25732 2.50736 8.25 3.75 8.25V3.75ZM3.75 9.75C3.33579 9.75 3 10.0858 3 10.5V13.5C3 13.9142 3.33579 14.25 3.75 14.25H14.25C14.6642 14.25 15 13.9142 15 13.5V10.5C15 10.0858 14.6642 9.75 14.25 9.75V11.25C14.25 11.6642 13.9142 12 13.5 12H4.5C4.08579 12 3.75 11.6642 3.75 11.25V9.75ZM5.25 4.5V9V10.5H12.75V9V4.5H5.25ZM6.75 6.75C6.75 6.33579 7.08579 6 7.5 6H10.5C10.9142 6 11.25 6.33579 11.25 6.75C11.25 7.16421 10.9142 7.5 10.5 7.5H7.5C7.08579 7.5 6.75 7.16421 6.75 6.75ZM6.75 9C6.75 8.58577 7.08579 8.25 7.5 8.25H10.5C10.9142 8.25 11.25 8.58577 11.25 9C11.25 9.41422 10.9142 9.75 10.5 9.75H7.5C7.08579 9.75 6.75 9.41422 6.75 9Z"
              fill={fill}
            />
          </svg>
        )}
      </IconConsumer>
    </Icon>
  );
});
