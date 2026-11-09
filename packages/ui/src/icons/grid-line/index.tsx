import { Icon, icon } from '@/ui/components/icon';

export const GridLineIcon = icon((props) => (
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
      width="6.5"
      height="6.5"
      rx="1.5"
    />
    <rect
      x="13.5"
      y="4"
      width="6.5"
      height="6.5"
      rx="1.5"
    />
    <rect
      x="4"
      y="13.5"
      width="6.5"
      height="6.5"
      rx="1.5"
    />
    <rect
      x="13.5"
      y="13.5"
      width="6.5"
      height="6.5"
      rx="1.5"
    />
  </Icon>
));
