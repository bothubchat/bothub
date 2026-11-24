import { Icon, icon } from '@/ui/components/icon';

export const Rewind10LineIcon = icon((props) => (
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
    <path d="M12 4.5A7.5 7.5 0 1 1 4.5 12M14.5 2 12 4.5 14.5 7" />
    <text
      x="12"
      y="15"
      fill="currentColor"
      stroke="none"
      fontSize="7.5"
      fontWeight="700"
      textAnchor="middle"
    >
      10
    </text>
  </Icon>
));
