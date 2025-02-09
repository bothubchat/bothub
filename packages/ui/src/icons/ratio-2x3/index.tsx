import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio2x3Icon = icon(({ ...props }) => (
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
            d="M13 2H3L3 15H13V2ZM3 1C2.44772 1 2 1.44772 2 2V15C2 15.5523 2.44772 16 3 16H13C13.5523 16 14 15.5523 14 15V2C14 1.44772 13.5523 1 13 1H3Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 3.5H7V4.5H5.5V6H4.5V3.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 13.5H7V12.5H5.5V11H4.5V13.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 3.5H9V4.5H10.5V6H11.5V3.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 13.5H9V12.5H10.5V11H11.5V13.5Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
