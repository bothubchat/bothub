import { Icon, icon } from '@/ui/components/icon';

export const CheckedIcon = icon(({ ...props }) => (
  <Icon
    size={50}
    viewBox="0 0 50 51"
    fill="none"
    {...props}
  >
    <rect
      y="0.5"
      width="50"
      height="50"
      rx="10"
      fill="url(#paint0_linear_294_9062)"
    />
    <path
      d="M36.4978 16.998C37.1674 17.6619 37.1674 18.7402 36.4978 19.4042L22.7851 33.002C22.1155 33.666 21.0281 33.666 20.3586 33.002L13.5022 26.2031C12.8326 25.5391 12.8326 24.4609 13.5022 23.7969C14.1717 23.1329 15.2591 23.1329 15.9287 23.7969L21.5745 29.3901L34.0767 16.998C34.7462 16.334 35.8336 16.334 36.5032 16.998H36.4978Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_294_9062"
        x1="-0.19685"
        y1="25.5"
        x2="49.8031"
        y2="25.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1C64F2" />
        <stop
          offset="1"
          stopColor="#D41CF2"
        />
      </linearGradient>
    </defs>
  </Icon>
));
