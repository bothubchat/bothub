import { Icon, icon, IconConsumer } from '@/ui/components/icon';

export const MenuDotIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 19" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <>
          <circle cx="9" cy="3" r="2" fill={fill} />
          <circle cx="9" cy="9" r="2" fill={fill} />
          <circle cx="9" cy="15" r="2" fill={fill} />
        </>
      )}
    </IconConsumer>
  </Icon>
));
