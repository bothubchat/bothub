import { Icon, icon } from '@/ui/components/icon';

export const MicLineIcon = icon((props) => (
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
      x="9"
      y="3"
      width="6"
      height="11"
      rx="3"
    />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </Icon>
));
