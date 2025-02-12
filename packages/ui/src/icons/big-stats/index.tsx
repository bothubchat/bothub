import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const BigStatsIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <rect
            width="24"
            height="24"
            rx="4"
            fill="#313E62"
          />
          <path
            d="M18 17.5H6V16.1667H18V17.5ZM9.33333 10.1667H6.66667V14.8333H9.33333V10.1667ZM13.3333 7.5H10.6667V14.8333H13.3333V7.5ZM17.3333 5.5H14.6667V14.8333H17.3333V5.5Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
