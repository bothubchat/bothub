import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const ExpandIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <path d="M15.75 15.75L11.25 11.25M15.75 15.75V12.15M15.75 15.75H12.15M2.25 12.15V15.75M2.25 15.75H5.85M2.25 15.75L6.75 11.25M15.75 5.85V2.25M15.75 2.25H12.15M15.75 2.25L11.25 6.75M2.25 5.85V2.25M2.25 2.25H5.85M2.25 2.25L6.75 6.75" stroke={fill} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </IconConsumer>
  </Icon>
));
