import { Icon, icon } from '@/ui/components/icon';

export const PlusLineIcon = icon((props) => (
  <Icon
    size={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    colorChannel="stroke"
    {...props}
  >
    <path d="M12 5v14M5 12h14" />
  </Icon>
));
