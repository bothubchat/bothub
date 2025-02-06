import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio9x16Icon = icon(({ ...props }) => (
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
            d="M11.25 1H3.75L3.75 15H11.25V1ZM3.75 0C3.33579 0 3 0.447715 3 1V15C3 15.5523 3.33579 16 3.75 16H11.25C11.6642 16 12 15.5523 12 15V1C12 0.447715 11.6642 0 11.25 0H3.75Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.875 2.5H6.75V3.5H5.625V5H4.875V2.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.875 13.5H6.75V12.5H5.625V11H4.875V13.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.125 2.5H8.25V3.5H9.375V5H10.125V2.5Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.125 13.5H8.25V12.5H9.375V11H10.125V13.5Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
