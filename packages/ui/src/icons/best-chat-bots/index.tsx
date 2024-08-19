import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const BestChatBots = icon(({ ...props }) => (
  <Icon size={19} viewBox="0 0 19 18" fill="none" {...props}>
    <IconConsumer>
      {() => (
        <>
          <rect
            x="0.5"
            width="18"
            height="18"
            rx="4"
            fill="url(#paint0_linear_2549_14537)"
          />
          <path
            d="M5.74595 11.3475C5.09614 10.7971 4.09961 11.2589 4.09961 12.1105V13.4C4.09961 13.9523 4.54732 14.4 5.09961 14.4H14.2522C14.6098 14.4 14.8996 14.1101 14.8996 13.7526C14.8996 13.5591 14.8131 13.3758 14.6638 13.2528L10.3419 9.69361C9.88904 9.3207 9.21398 9.41584 8.88186 9.89937L7.72602 11.5821C7.39077 12.0702 6.7072 12.1617 6.25539 11.779L5.74595 11.3475ZM4.09961 8.21225C4.09961 7.37542 5.06616 6.90873 5.72149 7.42914L6.49961 8.04706L8.87563 4.52495C9.20865 4.03131 9.8966 3.93628 10.351 4.32116L12.4996 6.14118H13.8996C14.4519 6.14118 14.8996 6.58889 14.8996 7.14117V9.72099C14.8996 10.5661 13.9163 11.0301 13.264 10.493L10.1024 7.88971C9.64937 7.51669 8.97402 7.61211 8.64209 8.09604L7.49817 9.76372C7.16297 10.2524 6.47874 10.344 6.02677 9.96078L4.09961 8.32659V8.21225Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2549_14537"
              x1="9.5"
              y1="0"
              x2="9.5"
              y2="18"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF7E5A" />
              <stop offset="0.536458" stopColor="#F8643B" />
              <stop offset="1" stopColor="#C42F06" />
            </linearGradient>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
