import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const ArticleGeneratorIcon = icon(({ ...props }) => (
  <Icon
    size={36}
    viewBox="0 0 36 36"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {() => (
        <>
          <rect
            width="36"
            height="36"
            rx="10"
            fill="url(#paint0_linear_3138_93064)"
          />
          <path
            d="M24.2222 26H11.7778C11.5715 26 11.3737 25.9157 11.2278 25.7657C11.0819 25.6157 11 25.4122 11 25.2V10.8C11 10.5878 11.0819 10.3843 11.2278 10.2343C11.3737 10.0843 11.5715 10 11.7778 10H24.2222C24.4285 10 24.6263 10.0843 24.7722 10.2343C24.9181 10.3843 25 10.5878 25 10.8V25.2C25 25.4122 24.9181 25.6157 24.7722 25.7657C24.6263 25.9157 24.4285 26 24.2222 26ZM14.1111 13.2V16.4H17.2222V13.2H14.1111ZM14.1111 18V19.6H21.8889V18H14.1111ZM14.1111 21.2V22.8H21.8889V21.2H14.1111ZM18.7778 14V15.6H21.8889V14H18.7778Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3138_93064"
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
        </>
      )}
    </IconConsumer>
  </Icon>
));
