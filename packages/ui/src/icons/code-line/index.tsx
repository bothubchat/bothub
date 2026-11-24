import { Icon, icon } from '@/ui/components/icon';

export const CodeLineIcon = icon((props) => (
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
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
  </Icon>
));
