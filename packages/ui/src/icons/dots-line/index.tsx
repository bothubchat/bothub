import { Icon, icon } from '@/ui/components/icon';

export const DotsLineIcon = icon((props) => (
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
    <g
      fill="currentColor"
      stroke="none"
    >
      <circle
        cx="5"
        cy="12"
        r="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="1.6"
      />
      <circle
        cx="19"
        cy="12"
        r="1.6"
      />
    </g>
  </Icon>
));
