import { Icon, icon } from '@/ui/components/icon';

export const GitLineIcon = icon((props) => (
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
      cx="6"
      cy="6"
      r="2"
    />
    <circle
      cx="6"
      cy="18"
      r="2"
    />
    <circle
      cx="18"
      cy="8"
      r="2"
    />
    <path d="M6 8v8M18 10c0 4-6 3-10.5 6.5" />
  </Icon>
));
