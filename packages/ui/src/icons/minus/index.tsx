import { Icon, icon } from '@/ui/components/icon';

export const MinusIcon = icon((props) => (
  <Icon
    size={20}
    viewBox="0 0 20 20"
    fill="none"
    defaultColor="#ffffff"
    {...props}
  >
    <path
      d="M9 9H4V11H9H11H16V9H11H9Z"
      fill="currentColor"
    />
  </Icon>
));
