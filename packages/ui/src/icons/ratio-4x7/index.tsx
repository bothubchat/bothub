import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio4x7Icon = icon(({ ...props }) => (
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
            d="M13 1H3L3 15H13V1ZM3 0C2.44772 0 2 0.447715 2 1V15C2 15.5523 2.44772 16 3 16H13C13.5523 16 14 15.5523 14 15V1C14 0.447715 13.5523 0 13 0H3Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 2.5H7V3.5H5.5V5H4.5V2.5Z"
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
            d="M11.5 2.5H9V3.5H10.5V5H11.5V2.5Z"
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
