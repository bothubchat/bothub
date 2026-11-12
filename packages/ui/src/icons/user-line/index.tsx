import { Icon, icon } from '@/ui/components/icon';

export const UserLineIcon = icon((props) => (
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
    <circle
      cx="12"
      cy="8"
      r="4"
    />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
));
