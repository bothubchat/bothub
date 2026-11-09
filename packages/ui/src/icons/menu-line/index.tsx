import { Icon, icon } from '@/ui/components/icon';

export const MenuLineIcon = icon((props) => (
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
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
));
