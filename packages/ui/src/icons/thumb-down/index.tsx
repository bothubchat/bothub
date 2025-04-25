import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const ThumbDownIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#fff' } = { fill: '#fff' }) => (
        <path
          fill="none"
          d="M5.99998 3H12.8939C13.4899 3 14.0293 3.35279 14.2682 3.89877L16.3742 8.71253C16.4572 8.90213 16.5 9.1068 16.5 9.3138V9.75C16.5 10.5784 15.8284 11.25 15 11.25H10.125L11.0299 14.5682C11.1579 15.0373 10.9369 15.5315 10.502 15.749C10.0653 15.9674 9.53505 15.8456 9.2373 15.4586L6.31104 11.6544C6.10934 11.3922 5.99998 11.0706 5.99998 10.7399V10.5M5.99998 3H1.5V10.5H5.99998M5.99998 3V10.5"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </IconConsumer>
  </Icon>
));
