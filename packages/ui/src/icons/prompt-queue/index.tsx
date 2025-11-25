import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const PromptQueueIcon = icon(({ ...props }) => (
  <Icon
    size={36}
    viewBox="0 0 36 36"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 30H30H6ZM6 6H30H6ZM6 12H21H6ZM6 18H16H6Z"
            fill={fill}
          />
          <path
            d="M6 30H30M6 6H30M6 12H21M6 18H16M6 24H21"
            stroke={fill}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 12L29.3571 15.441C29.4824 15.7587 29.545 15.9175 29.6409 16.0514C29.7259 16.1701 29.8299 16.274 29.9486 16.3591C30.0825 16.455 30.2413 16.5176 30.559 16.6429L34 18L30.559 19.3571C30.2413 19.4824 30.0825 19.545 29.9486 19.6409C29.8299 19.7259 29.7259 19.8299 29.6409 19.9486C29.545 20.0825 29.4824 20.2413 29.3571 20.559L28 24L26.6429 20.559C26.5176 20.2413 26.455 20.0825 26.3591 19.9486C26.274 19.8299 26.1701 19.7259 26.0514 19.6409C25.9175 19.545 25.7587 19.4824 25.441 19.3571L22 18L25.441 16.6429C25.7587 16.5176 25.9175 16.455 26.0514 16.3591C26.1701 16.274 26.274 16.1701 26.3591 16.0514C26.455 15.9175 26.5176 15.7587 26.6429 15.441L28 12Z"
            fill={fill}
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </IconConsumer>
  </Icon>
));
