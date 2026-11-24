import { Icon, icon } from '@/ui/components/icon';

export const MonitorLineIcon = icon((props) => (
  <Icon
    size={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    colorChannel="stroke"
    {...props}
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="12"
      rx="2"
    />
    <path d="M8 20h8M12 16v4" />
  </Icon>
));
