import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TextItalicIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path
          d="M10.1429 4L7.57143 13M10.1429 4H7.57143M10.1429 4H12.7143M7.57143 13H5M7.57143 13H10.1429"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </IconConsumer>
  </Icon>
));
