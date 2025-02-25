import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const UserProfileIcon = icon(({ ...props }) => (
  <Icon
    size={44}
    viewBox="0 0 44 44"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <>
          <g clipPath="url(#clip0_8574_130915)">
            <path
              d="M42 22C42 33.0457 33.0457 42 22 42C10.9543 42 2 33.0457 2 22C2 10.9543 10.9543 2 22 2C33.0457 2 42 10.9543 42 22Z"
              fill="#313E62"
            />
            <path
              d="M22 23.4062C23.6783 23.4062 25.2879 22.7395 26.4747 21.5528C27.6614 20.366 28.3281 18.7564 28.3281 17.0781C28.3281 15.3998 27.6614 13.7902 26.4747 12.6035C25.2879 11.4167 23.6783 10.75 22 10.75C20.3217 10.75 18.7121 11.4167 17.5253 12.6035C16.3386 13.7902 15.6719 15.3998 15.6719 17.0781C15.6719 18.7564 16.3386 20.366 17.5253 21.5528C18.7121 22.7395 20.3217 23.4062 22 23.4062ZM17.8384 24.8125C13.9229 24.8125 10.75 27.9853 10.75 31.9009C10.75 32.6479 11.3564 33.25 12.0991 33.25H31.9009C32.6479 33.25 33.25 32.6436 33.25 31.9009C33.25 27.9853 30.0772 24.8125 26.1616 24.8125H17.8384Z"
              fill={fill}
            />
          </g>
          <rect
            x="1.25"
            y="1.25"
            width="41.5"
            height="41.5"
            rx="20.75"
            stroke="url(#paint0_linear_8574_130915)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient
              id="paint0_linear_8574_130915"
              x1="1.84252"
              y1="22"
              x2="41.8425"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1C64F2" />
              <stop
                offset="1"
                stopColor="#D41CF2"
              />
            </linearGradient>
            <clipPath id="clip0_8574_130915">
              <rect
                x="2"
                y="2"
                width="40"
                height="40"
                rx="20"
                fill={fill}
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
