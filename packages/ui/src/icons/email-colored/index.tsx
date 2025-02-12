import { Icon, icon } from '@/ui/components/icon';

export const EmailColoredIcon = icon(({ ...props }) => (
  <Icon
    size={36}
    viewBox="0 0 36 36"
    fill="none"
    {...props}
  >
    <rect
      width="36"
      height="36"
      rx="10"
      fill="url(#paint0_linear_1341_30649)"
    />
    <path
      d="M11.6 23.5C11.16 23.5 10.7832 23.353 10.4696 23.059C10.156 22.765 9.99947 22.412 10 22V13C10 12.5875 10.1568 12.2343 10.4704 11.9403C10.784 11.6463 11.1605 11.4995 11.6 11.5H24.4C24.84 11.5 25.2168 11.647 25.5304 11.941C25.844 12.235 26.0005 12.588 26 13V22C26 22.4125 25.8432 22.7657 25.5296 23.0597C25.216 23.3537 24.8395 23.5005 24.4 23.5H11.6ZM18 18.25L24.4 14.5V13L18 16.75L11.6 13V14.5L18 18.25Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1341_30649"
        x1="-0.141732"
        y1="18"
        x2="35.8583"
        y2="18"
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
