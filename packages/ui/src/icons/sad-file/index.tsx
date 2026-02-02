import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const SadFileIcon = icon(({ ...props }) => (
  <Icon
    size={70}
    viewBox="0 0 70 70"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ stroke = '#313E62' } = { stroke: '#313E62' }) => (
        <>
          <g clipPath="url(#clip0_1453_16555)">
            <path
              d="M17.9207 1H40.9216L60.1814 21.082V60.8984C60.1813 65.3672 56.5502 68.9998 52.0662 69H17.9207C13.4509 68.9999 9.81921 65.3681 9.81909 60.8984V9.10156C9.81911 4.63183 13.4509 1.00006 17.9207 1Z"
              fill="#0E0C15"
              stroke={stroke}
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M41.3215 0V20.5194H61.1811L41.3215 0Z"
              fill={stroke}
            />
            <path
              d="M25.7351 48.3823C30.1874 48.3823 31.9928 48.3823 35.4374 48.3823C38.8821 48.3823 41.1249 48.3823 44.2645 48.3823"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M44.2645 40.147C45.9701 40.147 47.3527 38.0731 47.3527 35.5147C47.3527 32.9563 45.9701 30.8823 44.2645 30.8823C42.5589 30.8823 41.1763 32.9563 41.1763 35.5147C41.1763 38.0731 42.5589 40.147 44.2645 40.147Z"
              fill={stroke}
            />
            <path
              d="M25.7352 40.147C27.4408 40.147 28.8234 38.0731 28.8234 35.5147C28.8234 32.9563 27.4408 30.8823 25.7352 30.8823C24.0296 30.8823 22.647 32.9563 22.647 35.5147C22.647 38.0731 24.0296 40.147 25.7352 40.147Z"
              fill={stroke}
            />
          </g>
          <defs>
            <clipPath id="clip0_1453_16555">
              <rect
                width="70"
                height="70"
                fill="white"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
