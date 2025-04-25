import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TextUnderlineIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path
          d="M5.25 4V8.66667C5.25 10.5076 6.74239 12 8.58333 12C10.4243 12 11.9167 10.5076 11.9167 8.66667V4M3.75 15H14.25"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </IconConsumer>
  </Icon>
));
