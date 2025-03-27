import { Icon, icon, IconConsumer } from '@/ui/components';

export const TextGeneration = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18H20M4 14H20M4 10H14M4 6H10.6667"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.668 2.66406L19.5727 4.95808C19.6562 5.16984 19.698 5.27572 19.7619 5.365C19.8186 5.44413 19.8879 5.51342 19.967 5.5701C20.0563 5.63404 20.1622 5.6758 20.374 5.75932L22.668 6.66406L20.374 7.56882C20.1622 7.65233 20.0563 7.69406 19.967 7.75802C19.8879 7.81468 19.8186 7.88397 19.7619 7.96313C19.698 8.05242 19.6562 8.15828 19.5727 8.37006L18.668 10.6641L17.7632 8.37006C17.6797 8.15828 17.6379 8.05242 17.574 7.96313C17.5173 7.88397 17.448 7.81468 17.3689 7.75802C17.2796 7.69406 17.1737 7.65233 16.962 7.56882L14.668 6.66406L16.962 5.75932C17.1737 5.6758 17.2796 5.63404 17.3689 5.5701C17.448 5.51342 17.5173 5.44413 17.574 5.365C17.6379 5.27572 17.6797 5.16984 17.7632 4.95808L18.668 2.66406Z"
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
