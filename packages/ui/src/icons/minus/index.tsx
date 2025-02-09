import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const MinusIcon = icon(({ ...props }) => (
  <Icon
    size={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <path
          d="M9 9H4V11H9H11H16V9H11H9Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
