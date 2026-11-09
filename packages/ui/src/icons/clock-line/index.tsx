import { Icon, icon } from '@/ui/components/icon';

export const ClockLineIcon = icon((props) => (
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
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2" />
  </Icon>
));
