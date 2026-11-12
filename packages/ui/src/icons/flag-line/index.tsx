import { Icon, icon } from '@/ui/components/icon';

export const FlagLineIcon = icon((props) => (
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
    <path d="M5 21V4h13l-3 4.5 3 4.5H5" />
  </Icon>
));
