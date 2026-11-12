import { Icon, icon } from '@/ui/components/icon';

export const TempChatLineIcon = icon((props) => (
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
      strokeDasharray="3 3"
    />
    <path d="M12 7v5l3 2" />
  </Icon>
));
