import { Icon, icon } from '@/ui/components/icon';

export const WaveLineIcon = icon((props) => (
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
    <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 10v4" />
  </Icon>
));
