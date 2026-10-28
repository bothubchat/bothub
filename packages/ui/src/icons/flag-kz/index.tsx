import { Icon, icon } from '@/ui/components/icon';

const GOLD = '#FFCC4D';

// Simplified for an 18px icon: the ornament and the 32 rays are dashed
// strokes, the eagle is a pair of wings. The full drawing was 50 KB.
export const FlagKZIcon = icon((props) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M2 2.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"
      fill="#00AFCA"
    />
    <path
      d="M8.09 8.26a1.43 1.43 0 1 1 2.86 0 1.43 1.43 0 1 1-2.86 0ZM6.8 9.1c.5 1.6 1.5 2.25 2.72 2.25s2.22-.65 2.72-2.25c-.64 1.05-1.64 1.7-2.72 1.7S7.44 10.15 6.8 9.1ZM9.1 11.5h.84l-.42.55Z"
      fill={GOLD}
    />
    <path
      d="M7.57 8.26a1.95 1.95 0 1 1 3.9 0 1.95 1.95 0 1 1-3.9 0"
      stroke={GOLD}
      strokeWidth=".7"
      strokeDasharray=".17 .213"
      strokeDashoffset=".085"
    />
    <path
      d="M1.75 3.9v10.2"
      stroke={GOLD}
      strokeWidth=".9"
      strokeLinecap="round"
      strokeDasharray=".1 .9"
    />
  </Icon>
));
