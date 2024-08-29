import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const EnterIcon = icon(({ ...props }) => (
  <Icon size={16} viewBox="0 0 24 24" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#313E62' } = { fill: '#313E62' }) => (
        <>
          <mask
            id="mask0_2985_13326"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="1"
            y="1"
            width="22"
            height="22"
          >
            <path
              d="M21 22C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H13C12.4477 2 12 2.44772 12 3V9C12 9.55228 11.5523 10 11 10H3C2.44772 10 2 10.4477 2 11V21C2 21.5523 2.44772 22 3 22H21Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 14L9.20711 15.2929C8.81658 15.6834 8.81658 16.3166 9.20711 16.7071L10.5 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 11.5V15C17 15.5523 16.5523 16 16 16H8.5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
          <g mask="url(#mask0_2985_13326)">
            <path d="M0 0H24V24H0V0Z" fill={fill} />
          </g>
        </>
      )}
    </IconConsumer>
  </Icon>
));
