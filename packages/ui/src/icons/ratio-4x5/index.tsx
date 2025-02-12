import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio4x5Icon = icon(({ ...props }) => (
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
            d="M13 2H3L3 14H13V2ZM3 1C2.44772 1 2 1.44772 2 2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V2C14 1.44772 13.5523 1 13 1H3Z"
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
            d="M4.5 12.5H7V11.5H5.5V10H4.5V12.5Z"
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
            d="M11.5 12.5H9V11.5H10.5V10H11.5V12.5Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
