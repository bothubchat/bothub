import { Icon, icon } from '@/ui/components/icon';

export const MusicLineIcon = icon((props) => (
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
    <path d="M9 18V6l11-2v12" />
    <circle
      cx="6"
      cy="18"
      r="3"
    />
    <circle
      cx="17"
      cy="16"
      r="3"
    />
  </Icon>
));
