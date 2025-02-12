import { Icon, icon, IconConsumer } from '@/ui/components/icon';

export const DeclineCircleIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#FE4242' } = { fill: '#FE4242' }) => (
        <>
          <circle
            cx="12"
            cy="12"
            r="12"
            fill={fill}
          />
          <path
            d="M7 7.5L17 17.5M7 17.5L17 7.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
