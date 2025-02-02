import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const IncludeContextIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <>
          <path d="M5.25 13.5H7.875H10.5" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.25 10.5H5.625H6" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.25 7.5H6.375H7.5" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.25 1.5H12.375L15.75 4.875V14.25" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.25 15.375V4.875C2.25 4.25368 2.75368 3.75 3.375 3.75H10.6886C10.8079 3.75 10.9224 3.79741 11.0068 3.8818L13.3682 6.24319C13.4526 6.32759 13.5 6.44205 13.5 6.5614V15.375C13.5 15.9963 12.9963 16.5 12.375 16.5H3.375C2.75368 16.5 2.25 15.9963 2.25 15.375Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 6.3V4.01516C10.5 3.86872 10.6187 3.75 10.7652 3.75C10.8355 3.75 10.9029 3.77794 10.9527 3.82766L13.4223 6.29734C13.4721 6.34706 13.5 6.41451 13.5 6.48484C13.5 6.63128 13.3813 6.75 13.2348 6.75H10.95C10.7015 6.75 10.5 6.54853 10.5 6.3Z" fill={fill} stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </IconConsumer>
  </Icon>
));
