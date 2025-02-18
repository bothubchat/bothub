import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const ThumbUpIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#fff' } = { fill: '#fff' }) => (
        <path
          d="M5.99998 15H12.8939C13.4899 15 14.0293 14.6472 14.2682 14.1012L16.3742 9.28747C16.4572 9.09787 16.5 8.89319 16.5 8.68619V8.24999C16.5 7.42156 15.8284 6.74999 15 6.74999H10.125L11.0299 3.43177C11.1579 2.96267 10.9369 2.46847 10.502 2.25101C10.0653 2.03264 9.53505 2.15441 9.2373 2.54144L6.31104 6.34561C6.10934 6.60782 5.99998 6.92935 5.99998 7.26017V15ZM5.99998 15H1.5V7.49999H5.99998V15Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </IconConsumer>
  </Icon>
));
