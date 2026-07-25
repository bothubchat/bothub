import { Icon, icon } from '@/ui/components/icon';

export const DollarIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="12"
      fill="#1ABB34"
    />
    <g transform="translate(4 4.4)">
      <path
        d="M4.64 9.98C4.576 12.188 5.632 13.18 7.968 13.244C10.464 13.276 11.584 12.156 11.456 10.012C11.264 8.156 9.472 7.676 8.064 7.484C6.528 6.94 4.896 6.684 4.896 4.444C4.896 2.908 5.92 1.916 8.064 1.948C9.984 1.948 11.168 2.748 11.136 4.636"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 0.48V14.72"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </Icon>
));
