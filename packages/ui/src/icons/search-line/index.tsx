import { Icon, icon } from '@/ui/components/icon';

export const SearchLineIcon = icon((props) => (
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
      cx="11"
      cy="11"
      r="7"
    />
    <path d="m20 20-3.5-3.5" />
  </Icon>
));
