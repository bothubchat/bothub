import { Icon, icon } from '@/ui/components/icon';

export const SlidersLineIcon = icon((props) => (
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
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
    <circle
      cx="16"
      cy="6"
      r="2"
    />
    <circle
      cx="10"
      cy="12"
      r="2"
    />
    <circle
      cx="18"
      cy="18"
      r="2"
    />
  </Icon>
));
