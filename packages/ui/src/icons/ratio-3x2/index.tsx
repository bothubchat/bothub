import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Ratio3x2Icon = icon(({ ...props }) => (
  <Icon size={16} viewBox="0 0 16 16" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <path fillRule="evenodd" clipRule="evenodd" d="M15 3H1V13H15V3ZM1 2C0.447715 2 0 2.44772 0 3V13C0 13.5523 0.447715 14 1 14H15C15.5523 14 16 13.5523 16 13V3C16 2.44772 15.5523 2 15 2H1Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M2.5 4.5H5V5.5H3.5V7H2.5V4.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M2.5 11.5H5V10.5H3.5V9H2.5V11.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.5 4.5H11V5.5H12.5V7H13.5V4.5Z" fill={fill} />
          <path fillRule="evenodd" clipRule="evenodd" d="M13.5 11.5H11V10.5H12.5V9H13.5V11.5Z" fill={fill} />
        </>
      )}
    </IconConsumer>
  </Icon>
));
