import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio7x4Icon = icon(({ ...props }) => (
  <Icon
    size={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 4H1V12H15V4ZM1 3C0.447715 3 0 3.44772 0 4V12C0 12.5523 0.447715 13 1 13H15C15.5523 13 16 12.5523 16 12V4C16 3.44772 15.5523 3 15 3H1Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 10.5H11.5V9.5H12.5V8.5H13.5V10.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 5.5H11.5V6.5H12.5V7.5H13.5V5.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 10.5H4.5V9.5H3.5V8.5H2.5V10.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 5.5H4.5V6.5H3.5V7.5H2.5V5.5Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
