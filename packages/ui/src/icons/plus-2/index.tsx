import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Plus2Icon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 19" {...props}>
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path d="M7.83333 2.5V8.33333H2V10.6667H7.83333V16.5H10.1667V10.6667H16V8.33333H10.1667V2.5H7.83333Z" fill={fill} />
      )}
    </IconConsumer>
  </Icon>
));
