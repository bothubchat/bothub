import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio9x21Icon = icon(({ ...props }) => (
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
            d="M10.2222 0.761905H4.77778V15.1968L10.2222 15.2381V0.761905ZM4.58333 0C4.26117 0 4 0.447715 4 1V15C4 15.5523 4.26117 16 4.58333 16H10.4167C10.7388 16 11 15.5523 11 15V1C11 0.447715 10.7388 0 10.4167 0H4.58333Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.45833 2.5H6.91667V3.20265H6.04167V5H5.45833V2.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.45833 13.5H6.91667V12.8246H6.04167V11H5.45833V13.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.54167 2.5H8.08333V3.20265H8.95833V5H9.54167V2.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.54167 13.5H8.08333V12.8246H8.95833V11H9.54167V13.5Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
