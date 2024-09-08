import { Icon, icon, IconConsumer } from '@/ui/components/icon';

export const TextHideIcon = icon(({ ...props }) => (
  <Icon size={30} viewBox="0 0 30 20" fill="none" {...props}>
    <IconConsumer>
      {({ fill } = {}) => (
        <>
          <rect width="30" height="20" rx="4" fill={fill ? '#FFFFFF' : '#073CA4'} />
          <path d="M10 12L15 8L20 12" stroke={fill ?? '#4785FF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </IconConsumer>
  </Icon>
));
