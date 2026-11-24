import { Icon, icon } from '@/ui/components/icon';

export const ArrowUpLineIcon = icon((props) => (
  <Icon
    size={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    colorChannel="stroke"
    {...props}
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </Icon>
));
