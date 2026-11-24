import { Icon, icon } from '@/ui/components/icon';

export const GemLineIcon = icon((props) => (
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
    <path d="M6 3h12l4 6-10 12L2 9l4-6ZM2 9h20M12 21 8 9l4-6 4 6-4 12" />
  </Icon>
));
