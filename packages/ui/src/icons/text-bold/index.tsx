import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TextBoldIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path
          d="M5.79463 14.3862H9.72712C12.0248 14.3862 13.4788 13.1733 13.4788 11.3125C13.4788 9.84347 12.4241 8.78124 10.8873 8.69838V8.63811C12.1378 8.46483 12.9891 7.52317 12.9891 6.32534C12.9891 4.64536 11.7084 3.61328 9.61413 3.61328H5.79463C4.98855 3.61328 4.52148 4.0879 4.52148 4.91655V13.0904C4.52148 13.9115 4.98855 14.3862 5.79463 14.3862ZM7.00754 8.08818V5.38365H8.86077C9.91544 5.38365 10.5407 5.86579 10.5407 6.69446C10.5407 7.56836 9.84765 8.08818 8.67244 8.08818H7.00754ZM7.00754 12.6459V9.65511H8.89844C10.2243 9.65511 10.9551 10.1674 10.9551 11.1317C10.9551 12.1186 10.2469 12.6459 8.95116 12.6459H7.00754Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
