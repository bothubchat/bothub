import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio5x4Icon = icon(({ ...props }) => (
  <Icon size={16} viewBox="0 0 16 16" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <path fillRule="evenodd" clipRule="evenodd" d="M15 2H1V14H15V2ZM1 1C0.447715 1 0 1.44772 0 2V14C0 14.5523 0.447715 15 1 15H15C15.5523 15 16 14.5523 16 14V2C16 1.44772 15.5523 1 15 1H1Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M2.5 3.5H6V4.5H3.5V7H2.5V3.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M2.5 12.5H6V11.5H3.5V9H2.5V12.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.5 3.5H10V4.5H12.5V7H13.5V3.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.5 12.5H10V11.5H12.5V9H13.5V12.5Z" fill={fill} />
        </>
      )}
    </IconConsumer>
  </Icon>
));
