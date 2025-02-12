import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const ModelIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#1C64F2' } = { fill: '#1C64F2' }) => (
        <>
          <g clipPath="url(#clip0_1915_59910)">
            <circle
              cx="12"
              cy="12"
              r="12"
              fill={fill}
            />
            <path
              d="M17.7781 8.25938C17.797 8.24837 17.8127 8.23261 17.8235 8.21366C17.8344 8.19472 17.8401 8.17325 17.8401 8.15141C17.8401 8.12956 17.8344 8.1081 17.8235 8.08915C17.8127 8.07021 17.797 8.05445 17.7781 8.04344L13.005 5.27031C12.6996 5.09329 12.3529 5.00006 11.9998 5.00006C11.6468 5.00006 11.3001 5.09329 10.9947 5.27031L6.2225 8.04344C6.20363 8.05445 6.18798 8.07021 6.1771 8.08915C6.16622 8.1081 6.16049 8.12956 6.16049 8.15141C6.16049 8.17325 6.16622 8.19472 6.1771 8.21366C6.18798 8.23261 6.20363 8.24837 6.2225 8.25938L11.9375 11.6213C11.9567 11.6326 11.9786 11.6385 12.0009 11.6385C12.0233 11.6385 12.0452 11.6326 12.0644 11.6213L17.7781 8.25938ZM5.6875 9.10969C5.66844 9.09868 5.64681 9.09291 5.6248 9.09294C5.60279 9.09298 5.58118 9.09882 5.56215 9.10989C5.54312 9.12096 5.52736 9.13685 5.51644 9.15597C5.50553 9.17508 5.49986 9.19674 5.5 9.21875V14.6528C5.50047 14.9147 5.56949 15.1719 5.70019 15.3988C5.8309 15.6257 6.01872 15.8144 6.245 15.9463L11.3125 18.9847C11.3315 18.9957 11.353 19.0014 11.375 19.0014C11.3969 19.0014 11.4184 18.9957 11.4374 18.9847C11.4564 18.9738 11.4722 18.958 11.4832 18.939C11.4942 18.92 11.5 18.8985 11.5 18.8766V12.5719C11.5 12.55 11.4942 12.5284 11.4832 12.5094C11.4723 12.4905 11.4565 12.4747 11.4375 12.4638L5.6875 9.10969ZM12.5 12.5938V18.875C12.5 18.8969 12.5058 18.9185 12.5168 18.9375C12.5278 18.9564 12.5436 18.9722 12.5626 18.9832C12.5816 18.9941 12.6031 18.9999 12.625 18.9999C12.647 18.9999 12.6685 18.9941 12.6875 18.9831L17.7547 15.9447C17.9808 15.8131 18.1685 15.6246 18.2993 15.3979C18.43 15.1713 18.4992 14.9144 18.5 14.6528V9.21875C18.4999 9.19685 18.4941 9.17535 18.4831 9.15641C18.4721 9.13747 18.4563 9.12175 18.4373 9.11083C18.4183 9.09991 18.3968 9.09417 18.3749 9.09419C18.353 9.09421 18.3315 9.09999 18.3125 9.11094L12.5625 12.4859C12.5436 12.4969 12.5278 12.5126 12.5169 12.5315C12.5059 12.5504 12.5001 12.5719 12.5 12.5938Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1915_59910">
              <rect
                width="24"
                height="24"
                fill="white"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
