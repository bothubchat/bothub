import { Icon, icon } from '@/ui/components/icon';

export const ArrowUpIcon = icon((props) => (
  <Icon
    size={16}
    viewBox="0 0 16 16"
    fill="none"
    defaultColor="#ffffff"
    {...props}
  >
    <path
      d="M3 10L8 6L13 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
));
