import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const ActionChatIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <>
          <g clipPath="url(#clip0_689_20756)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.75 2.25C13.7446 2.25 14.6984 2.64509 15.4016 3.34835C16.1049 4.05161 16.5 5.00544 16.5 6V12C16.5 12.9946 16.1049 13.9484 15.4016 14.6517C14.6984 15.3549 13.7446 15.75 12.75 15.75L2.49999 16C2.30108 16 0.640643 16.6407 0.499991 16.5C0.359339 16.3593 1.49999 14.1989 1.49999 14L1.49999 6C1.49999 5.00544 1.89508 4.05161 2.59834 3.34835C3.3016 2.64509 4.25543 2.25 5.24999 2.25H12.75ZM6.74999 7.5C6.56629 7.50002 6.38899 7.56747 6.25171 7.68954C6.11444 7.81161 6.02674 7.97981 6.00524 8.16225L5.99999 8.25V9.75C6.00021 9.94116 6.0734 10.125 6.20463 10.264C6.33586 10.403 6.51521 10.4867 6.70604 10.4979C6.89687 10.5091 7.08478 10.447 7.23137 10.3243C7.37796 10.2016 7.47217 10.0276 7.49474 9.83775L7.49999 9.75V8.25C7.49999 8.05109 7.42097 7.86032 7.28032 7.71967C7.13967 7.57902 6.94891 7.5 6.74999 7.5ZM11.25 7.5C11.0511 7.5 10.8603 7.57902 10.7197 7.71967C10.579 7.86032 10.5 8.05109 10.5 8.25V9.75C10.5 9.94891 10.579 10.1397 10.7197 10.2803C10.8603 10.421 11.0511 10.5 11.25 10.5C11.4489 10.5 11.6397 10.421 11.7803 10.2803C11.921 10.1397 12 9.94891 12 9.75V8.25C12 8.05109 11.921 7.86032 11.7803 7.71967C11.6397 7.57902 11.4489 7.5 11.25 7.5Z"
              fill={fill}
            />
          </g>
          <defs>
            <clipPath id="clip0_689_20756">
              <rect
                width="18"
                height="18"
                fill="white"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
