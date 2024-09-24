import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const BigArticleIcon = icon(({ ...props }) => (
  <Icon size={24} viewBox="0 0 24 24" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <rect width="24" height="24" rx="4" fill="#313E62" />
          <path
            d="M8.1111 7.1808H7.6111V7.6808 10.5608 11.0608H8.1111 11.2222 11.7222V10.5608 7.6808 7.1808H11.2222 8.1111ZM8.1111 11.5008H7.6111V12.0008 13.4408 13.9408H8.1111 15.8889 16.3889V13.4408 12.0008 11.5008H15.8889 8.1111ZM8.1111 14.3808H7.6111V14.8808 16.3208 16.8208H8.1111 15.8889 16.3889V16.3208 14.8808 14.3808H15.8889 8.1111ZM12.7778 7.9008H12.2778V8.4008 9.8408 10.3408H12.7778 15.8889 16.3889V9.8408 8.4008 7.9008H15.8889 12.7778ZM18.2222 18.7008H5.7778C5.6922 18.7008 5.6171 18.6689 5.5675 18.623 5.5191 18.5782 5.5 18.5261 5.5 18.4808V5.5208C5.5 5.4754 5.5191 5.4234 5.5675 5.3786 5.6171 5.3326 5.6922 5.3008 5.7778 5.3008H18.2222C18.3078 5.3008 18.3829 5.3326 18.4325 5.3786 18.4809 5.4234 18.5 5.4754 18.5 5.5208V18.4808C18.5 18.5261 18.4809 18.5782 18.4325 18.623 18.3829 18.6689 18.3078 18.7008 18.2222 18.7008Z"
            fill={fill}
            stroke={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));