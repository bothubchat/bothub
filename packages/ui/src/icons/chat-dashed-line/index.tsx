import { Icon, icon } from '@/ui/components/icon';

export const ChatDashedLineIcon = icon((props) => (
  <Icon
    size={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    colorChannel="stroke"
    {...props}
  >
    <path
      d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4.3A7.5 7.5 0 1 1 20 11.5Z"
      strokeDasharray="3 2.5"
    />
  </Icon>
));
