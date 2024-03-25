import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const LoaderCircularGradientIcon = icon(({ ...props }) => (
  <Icon size={16} viewBox="0 0 16 16" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <>
          <g clipPath="url(#clip0_1372_35652)">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.9903 11.302C3.75069 12.4557 4.88592 13.3115 6.20425 13.725C7.20258 14.0381 8.25959 14.0831 9.27108 13.8638C9.81083 13.7468 10.3924 13.9874 10.5973 14.5003C10.8023 15.0131 10.5534 15.6017 10.019 15.741C8.57338 16.1181 7.04387 16.0844 5.60568 15.6333C3.8479 15.082 2.33427 13.9409 1.32042 12.4027C0.306575 10.8646 -0.14535 9.02366 0.040973 7.19088C0.193419 5.69134 0.765479 4.27244 1.68193 3.09258C2.02072 2.65641 2.65968 2.65974 3.0502 3.05026C3.44073 3.44079 3.43256 4.07011 3.11224 4.52001C2.51196 5.36313 2.13654 6.35224 2.03072 7.39317C1.89097 8.76775 2.22992 10.1484 2.9903 11.302Z" fill="url(#paint0_linear_1372_35652)">
              <animateTransform 
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 8 8"
                to="360 8 8"
                dur="1.15s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          <defs>
            <linearGradient id="paint0_linear_1372_35652" x1="2.99995" y1="6.50001" x2="10.5" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor={fill} />
              <stop offset="1" stopColor={fill} stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_1372_35652">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
