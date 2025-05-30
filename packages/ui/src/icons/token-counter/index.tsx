import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const TokenCounterIcon = icon(({ ...props }) => {
  const theme = useTheme();
  const fillColor = theme.colors.base.white;
  return (
    <Icon
      size={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ fill = fillColor } = { fill: fillColor }) => (
          <>
            <path
              d="M19 2.66663L19.9048 4.96064C19.9883 5.1724 20.03 5.27828 20.094 5.36756C20.1506 5.4467 20.2199 5.51599 20.2991 5.57267C20.3884 5.6366 20.4942 5.67836 20.706 5.76188L23 6.66663L20.706 7.57138C20.4942 7.65489 20.3884 7.69663 20.2991 7.76058C20.2199 7.81725 20.1506 7.88654 20.094 7.96569C20.03 8.05498 19.9883 8.16085 19.9048 8.37263L19 10.6666L18.0953 8.37263C18.0117 8.16085 17.97 8.05498 17.906 7.96569C17.8494 7.88654 17.7801 7.81725 17.7009 7.76058C17.6117 7.69663 17.5058 7.65489 17.294 7.57138L15 6.66663L17.294 5.76188C17.5058 5.67836 17.6117 5.6366 17.7009 5.57267C17.7801 5.51599 17.8494 5.4467 17.906 5.36756C17.97 5.27828 18.0117 5.1724 18.0953 4.96064L19 2.66663Z"
              fill={fill}
              stroke={fill}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.83788 15.0255C4.33268 16.1957 5.1066 17.2268 6.09197 18.0287C7.07734 18.8307 8.24417 19.3791 9.49043 19.6259C10.7367 19.8727 12.0244 19.8105 13.2411 19.4447C14.4578 19.0789 15.5663 18.4206 16.4698 17.5273C17.3732 16.6341 18.0441 15.5332 18.4238 14.3208"
              stroke={fill}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.7732 4.14816C11.527 3.90132 10.2392 3.96354 9.02257 4.32937C7.80591 4.69519 6.69739 5.35349 5.79392 6.2467C4.89045 7.13991 4.21954 8.24084 3.83984 9.45325"
              stroke={fill}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
