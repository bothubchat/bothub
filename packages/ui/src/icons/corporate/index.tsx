import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const CorporateIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <path
            d="M20.9031 5.38886H17.0041V3.66212C17.0041 2.92209 16.7705 2 15.3327 2H8.66563C7.22717 2 7.04745 2.92209 7.04745 3.66212V5.38886H3.09687C1.92812 5.38886 1 6.37557 1 7.53848V8.77186L10.7625 13.4235C10.8313 12.7539 11.3469 12.2253 12 12.2253C12.6531 12.2253 13.2031 12.7539 13.2375 13.4235L23 8.77186V7.53848C23 6.37557 22.0719 5.38886 20.9031 5.38886ZM15.85 5.38886H8.39537V3.66212C8.39537 3.30973 8.32188 3.02781 8.66563 3.02781H15.2313C15.575 3.02781 15.85 3.30973 15.85 3.66212V5.38886Z"
            fill={fill}
          />
          <path
            d="M12.5844 15.0445V13.5292C12.5844 13.2121 12.3438 12.9301 12 12.9301C11.6562 12.9301 11.4156 13.1768 11.4156 13.5292V15.0445C11.4156 15.3617 11.6562 15.6436 12 15.6436C12.3438 15.6436 12.5844 15.3617 12.5844 15.0445Z"
            fill={fill}
          />
          <path
            d="M13.2719 15.0445C13.2719 15.7493 12.7219 16.3484 12 16.3484C11.2781 16.3484 10.7281 15.7845 10.7281 15.0445V14.1988L1 9.54713V18.8504C1 20.0485 1.92812 21 3.09687 21H20.9031C22.0719 21 23 20.0485 23 18.8504V9.54713L13.2719 14.1988V15.0445Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
