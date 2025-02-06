import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const ArrowUpIcon = icon(({ ...props }) => (
  <Icon
    size={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <path
          d="M3 10L8 6L13 10"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </IconConsumer>
  </Icon>
));
