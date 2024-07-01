import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const MenuIcon = icon(({ ...props }) => (
  <IconConsumer>
    {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
      <Icon size={18} viewBox="0 0 18 19" fill="none" {...props}>
        <path d="M2 5L16 5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        <path d="M2 9L16 9" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        <path d="M2 13L16 13" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      </Icon>
    )}
  </IconConsumer>
));
