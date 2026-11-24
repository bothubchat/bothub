import { Icon, icon } from '@/ui/components/icon';

export const Forward10LineIcon = icon((props) => (
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
    <path d="M12 4.5A7.5 7.5 0 1 0 19.5 12M9.5 2 12 4.5 9.5 7" />
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
