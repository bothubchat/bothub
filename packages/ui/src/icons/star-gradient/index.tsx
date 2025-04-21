import { Icon, icon } from '@/ui/components/icon';

interface StarGradientIconProps {
  id?: string;
  x1?: string;
  y1?: string;
  x2?: string;
  y2?: string;
  startColor?: string;
  endColor?: string;
}

const StarGradientIconComponent: React.FC<StarGradientIconProps> = ({
  id = 'paint0_linear_10915_5298',
  x1 = '0',
  y1 = '9.00002',
  x2 = '18',
  y2 = '9.00002',
  startColor = '#00247D',
  endColor = '#1C64F2',
  ...props
}) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M8.07668 2.21993C8.41827 1.39863 9.58173 1.39864 9.92332 2.21993L11.146 5.15952C11.29 5.50576 11.6156 5.74233 11.9894 5.77229L15.1629 6.02671C16.0496 6.0978 16.4091 7.2043 15.7336 7.78297L13.3157 9.85416C13.0309 10.0981 12.9065 10.4809 12.9935 10.8456L13.7322 13.9425C13.9386 14.8077 12.9973 15.4916 12.2382 15.0279L9.52125 13.3684C9.20124 13.1729 8.79876 13.1729 8.47875 13.3684L5.76175 15.0279C5.00266 15.4916 4.0614 14.8077 4.26779 13.9425L5.0065 10.8456C5.09351 10.4809 4.96914 10.0981 4.68435 9.85416L2.26645 7.78297C1.59091 7.2043 1.95044 6.0978 2.83709 6.02671L6.01063 5.77229C6.38442 5.74233 6.71003 5.50576 6.85403 5.15952L8.07668 2.21993Z"
      fill={`url(#${id})`}
    />
    <defs>
      <linearGradient
        id={id}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={startColor} />
        <stop
          offset="1"
          stopColor={endColor}
        />
      </linearGradient>
    </defs>
  </Icon>
);

export const StarGradientIcon = icon(StarGradientIconComponent);
