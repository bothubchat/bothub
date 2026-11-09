import { Icon, icon } from '@/ui/components/icon';

export const PanelShowLineIcon = icon((props) => (
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
      x="3"
      y="4"
      width="18"
      height="16"
      rx="3"
    />
    <path d="M9 4v16M13 10l2 2-2 2" />
  </Icon>
));
