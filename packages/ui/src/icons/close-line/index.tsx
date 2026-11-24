import { Icon, icon } from '@/ui/components/icon';

export const CloseLineIcon = icon((props) => (
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
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
));
