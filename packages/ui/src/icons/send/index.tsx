import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const SendIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 19"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <>
          <g clipPath="url(#clip0_338_11089)">
            <path
              d="M16.9161 3.6004C17.3086 2.65022 16.2564 1.72946 15.1705 2.07375L1.8994 6.27362C0.80991 6.6187 0.678153 7.91954 1.68041 8.42762L5.91663 10.5737L9.69942 7.26355C9.87079 7.11871 10.1003 7.03857 10.3386 7.04038C10.5768 7.04219 10.8047 7.12582 10.9732 7.27324C11.1417 7.42066 11.2372 7.62009 11.2393 7.82857C11.2414 8.03705 11.1498 8.2379 10.9843 8.38787L7.20149 11.698L9.65489 15.4049C10.2346 16.2819 11.7212 16.1658 12.1156 15.2133L16.9161 3.6004Z"
              fill={fill}
            />
          </g>
          <defs>
            <clipPath id="clip0_338_11089">
              <rect
                width="18"
                height="18"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
