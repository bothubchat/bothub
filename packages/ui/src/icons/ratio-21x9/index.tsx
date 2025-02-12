import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio21x9Icon = icon(({ ...props }) => (
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
            d="M15 6.02083H1V11.125H15V6.02083ZM1 5C0.447715 5 0 5.26117 0 5.58333V11.4167C0 11.7388 0.447715 12 1 12H8H15C15.5523 12 16 11.7388 16 11.4167V5.58333C16 5.26117 15.5523 5 15 5H1Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 6.5H5V7.126L3.23902 7.126V8L2.5 8V6.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 10.5417H5V9.95833H3.23902V9.08333H2.5V10.5417Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 6.5H11V7.126H12.7681V8H13.5V6.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 10.5417H11V9.95833H12.7681V9.08333H13.5V10.5417Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
