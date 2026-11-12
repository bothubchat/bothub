import { Icon, icon } from '@/ui/components/icon';

export const SelectLineIcon = icon((props) => (
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
      x="4"
      y="4"
      width="16"
      height="16"
      rx="3"
    />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Icon>
));
