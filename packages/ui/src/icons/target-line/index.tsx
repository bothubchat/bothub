import { Icon, icon } from '@/ui/components/icon';

export const TargetLineIcon = icon((props) => (
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
      cy="12"
      r="9"
    />
    <circle
      cx="12"
      cy="12"
      r="5"
    />
    <circle
      cx="12"
      cy="12"
      r="1"
    />
  </Icon>
));
