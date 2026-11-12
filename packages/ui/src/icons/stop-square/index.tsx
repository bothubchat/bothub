import { Icon, icon } from '@/ui/components/icon';

/** Квадрат «стоп» для кнопки, которая прерывает генерацию */
export const StopSquareIcon = icon((props) => (
  <Icon
    size={18}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect
      x="7"
      y="7"
      width="10"
      height="10"
      rx="2"
      fill="currentColor"
    />
  </Icon>
));
