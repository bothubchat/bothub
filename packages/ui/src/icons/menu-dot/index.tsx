import { Icon, icon } from '@/ui/components/icon';

export const MenuDotIcon = icon((props) => (
  <Icon
    size={18}
    viewBox="0 0 18 19"
    fill="none"
    defaultColor="#616D8D"
    {...props}
  >
    <circle
      cx="9"
      cy="3"
      r="2"
      fill="currentColor"
    />
    <circle
      cx="9"
      cy="9"
      r="2"
      fill="currentColor"
    />
    <circle
      cx="9"
      cy="15"
      r="2"
      fill="currentColor"
    />
  </Icon>
));
