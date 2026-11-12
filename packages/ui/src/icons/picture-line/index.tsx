import { Icon, icon } from '@/ui/components/icon';

export const PictureLineIcon = icon((props) => (
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
    <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM10.6 10a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0ZM21 15l-5-5L5 20" />
  </Icon>
));
