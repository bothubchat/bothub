import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio16x9Icon = icon(({ ...props }) => (
  <Icon size={16} viewBox="0 0 16 16" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 4H1V11H15V4ZM1 3C0.447715 3 0 3.33579 0 3.75V11.25C0 11.6642 0.447715 12 1 12H8H15C15.5523 12 16 11.6642 16 11.25V3.75C16 3.33579 15.5523 3 15 3H1Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 4.875H5V5.625H3.23902V6.75H2.5V4.875Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 10.125H5V9.375H3.23902V8.25H2.5V10.125Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 4.875H11V5.625H12.7681V6.75H13.5V4.875Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 10.125H11V9.375H12.7681V8.25H13.5V10.125Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
