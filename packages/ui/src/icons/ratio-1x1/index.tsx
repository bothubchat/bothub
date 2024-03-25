import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio1x1Icon = icon(({ ...props }) => (
  <Icon size={16} viewBox="0 0 16 16" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <path fillRule="evenodd" clipRule="evenodd" d="M15 1H1V15H15V1ZM1 0C0.447715 0 0 0.447715 0 1V15C0 15.5523 0.447715 16 1 16H15C15.5523 16 16 15.5523 16 15V1C16 0.447715 15.5523 0 15 0H1Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M2.5 2.5H6V3.5H3.5V6H2.5V2.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M2.5 13.5H6V12.5H3.5V10H2.5V13.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.5 2.5H10V3.5H12.5V6H13.5V2.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.5 13.5H10V12.5H12.5V10H13.5V13.5Z" fill={fill} />
        </>
      )}
    </IconConsumer>
  </Icon>
));
