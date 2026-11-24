import { Icon, icon } from '@/ui/components/icon';

export const ImageLineIcon = icon((props) => (
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
    <circle
      cx="9"
      cy="10"
      r="2"
    />
    <path d="m21 16-5-5-9 9" />
  </Icon>
));
