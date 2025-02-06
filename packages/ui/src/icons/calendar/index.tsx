import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const CalendarIcon = icon(({ ...props }) => (
  <Icon
    size={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#848798' } = { fill: '#848798' }) => (
        <path
          d="M10 11.6C9.77963 11.6 9.59504 11.5232 9.44622 11.3696C9.29689 11.2165 9.22222 11.0267 9.22222 10.8C9.22222 10.5733 9.29689 10.3832 9.44622 10.2296C9.59504 10.0765 9.77963 10 10 10C10.2204 10 10.4052 10.0765 10.5546 10.2296C10.7034 10.3832 10.7778 10.5733 10.7778 10.8C10.7778 11.0267 10.7034 11.2165 10.5546 11.3696C10.4052 11.5232 10.2204 11.6 10 11.6ZM6.88889 11.6C6.66852 11.6 6.48367 11.5232 6.33433 11.3696C6.18552 11.2165 6.11111 11.0267 6.11111 10.8C6.11111 10.5733 6.18552 10.3832 6.33433 10.2296C6.48367 10.0765 6.66852 10 6.88889 10C7.10926 10 7.29411 10.0765 7.44344 10.2296C7.59226 10.3832 7.66667 10.5733 7.66667 10.8C7.66667 11.0267 7.59226 11.2165 7.44344 11.3696C7.29411 11.5232 7.10926 11.6 6.88889 11.6ZM13.1111 11.6C12.8907 11.6 12.7061 11.5232 12.5573 11.3696C12.408 11.2165 12.3333 11.0267 12.3333 10.8C12.3333 10.5733 12.408 10.3832 12.5573 10.2296C12.7061 10.0765 12.8907 10 13.1111 10C13.3315 10 13.5161 10.0765 13.6649 10.2296C13.8142 10.3832 13.8889 10.5733 13.8889 10.8C13.8889 11.0267 13.8142 11.2165 13.6649 11.3696C13.5161 11.5232 13.3315 11.6 13.1111 11.6ZM10 14.8C9.77963 14.8 9.59504 14.7232 9.44622 14.5696C9.29689 14.4165 9.22222 14.2267 9.22222 14C9.22222 13.7733 9.29689 13.5835 9.44622 13.4304C9.59504 13.2768 9.77963 13.2 10 13.2C10.2204 13.2 10.4052 13.2768 10.5546 13.4304C10.7034 13.5835 10.7778 13.7733 10.7778 14C10.7778 14.2267 10.7034 14.4165 10.5546 14.5696C10.4052 14.7232 10.2204 14.8 10 14.8ZM6.88889 14.8C6.66852 14.8 6.48367 14.7232 6.33433 14.5696C6.18552 14.4165 6.11111 14.2267 6.11111 14C6.11111 13.7733 6.18552 13.5835 6.33433 13.4304C6.48367 13.2768 6.66852 13.2 6.88889 13.2C7.10926 13.2 7.29411 13.2768 7.44344 13.4304C7.59226 13.5835 7.66667 13.7733 7.66667 14C7.66667 14.2267 7.59226 14.4165 7.44344 14.5696C7.29411 14.7232 7.10926 14.8 6.88889 14.8ZM13.1111 14.8C12.8907 14.8 12.7061 14.7232 12.5573 14.5696C12.408 14.4165 12.3333 14.2267 12.3333 14C12.3333 13.7733 12.408 13.5835 12.5573 13.4304C12.7061 13.2768 12.8907 13.2 13.1111 13.2C13.3315 13.2 13.5161 13.2768 13.6649 13.4304C13.8142 13.5835 13.8889 13.7733 13.8889 14C13.8889 14.2267 13.8142 14.4165 13.6649 14.5696C13.5161 14.7232 13.3315 14.8 13.1111 14.8ZM4.55556 18C4.12778 18 3.76144 17.8435 3.45656 17.5304C3.15219 17.2168 3 16.84 3 16.4V5.2C3 4.76 3.15219 4.38347 3.45656 4.0704C3.76144 3.7568 4.12778 3.6 4.55556 3.6H5.33333V2H6.88889V3.6H13.1111V2H14.6667V3.6H15.4444C15.8722 3.6 16.2386 3.7568 16.5434 4.0704C16.8478 4.38347 17 4.76 17 5.2V16.4C17 16.84 16.8478 17.2168 16.5434 17.5304C16.2386 17.8435 15.8722 18 15.4444 18H4.55556ZM4.55556 16.4H15.4444V8.4H4.55556V16.4Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
