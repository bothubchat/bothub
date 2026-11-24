import { Icon, icon } from '@/ui/components/icon';

export const ForkLineIcon = icon((props) => (
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
      cy="5"
      r="2"
    />
    <circle
      cx="18"
      cy="5"
      r="2"
    />
    <circle
      cx="12"
      cy="19"
      r="2"
    />
    <path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5" />
  </Icon>
));
