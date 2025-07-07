import { Icon, icon, IconConsumer } from '@/ui/components/icon';

export const StarsGradientIcon = icon(({ ...props }) => (
  <Icon
    size={20}
    viewBox="0 0 20 21"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {() => (
        <>
          <path
            d="M16.3636 0.5L15.2182 3L12.7273 4.13636L15.2182 5.28182L16.3636 7.77273L17.5 5.28182L20 4.13636L17.5 3M7.27273 3.22727L5 8.22727L0 10.5L5 12.7727L7.27273 17.7727L9.54545 12.7727L14.5455 10.5L9.54545 8.22727M16.3636 13.2273L15.2182 15.7182L12.7273 16.8636L15.2182 18L16.3636 20.5L17.5 18L20 16.8636L17.5 15.7182"
            fill="url(#paint0_linear_158_231)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_158_231"
              x1="0"
              y1="10.5"
              x2="20"
              y2="10.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5728FF" />
              <stop
                offset="1"
                stopColor="#A750FF"
              />
            </linearGradient>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
