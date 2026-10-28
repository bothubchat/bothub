import { Icon, icon } from '@/ui/components/icon';

export const DeclineCircleIcon = icon((props) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    defaultColor="#FE4242"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="12"
      fill="currentColor"
    />
    <path
      d="M7 7.5L17 17.5M7 17.5L17 7.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Icon>
));
