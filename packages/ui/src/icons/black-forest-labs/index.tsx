import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const BlackForestLabsIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <>
          <rect
            width="24"
            height="24"
            rx="5"
            fill={fill}
          />
          <path
            d="M8.67334 15.8942L10.438 13.215L12.2028 15.8942H8.67334Z"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
          />
          <path
            d="M18.4705 11.6723L20.2352 8.99312L21.9999 11.6723H18.4705Z"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
          />
          <path
            d="M21.9594 19.2227H20.1947L11.9594 6.76038L4.7789 17.7207H14.9817L15.9554 19.2227H2L11.9797 4L21.9594 19.2227Z"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
          />
          <path
            d="M14.211 11.8751H12.4058L17.1725 19.2023H18.9575L14.211 11.8751Z"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
