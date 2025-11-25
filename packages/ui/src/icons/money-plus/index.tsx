import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const MoneyPlusIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ stroke = 'white' } = { stroke: 'white' }) => (
        <>
          <path
            d="M11 19.5H6.2C5.07989 19.5 4.51984 19.5 4.09202 19.282C3.71569 19.0903 3.40973 18.7843 3.21799 18.408C3 17.9802 3 17.4201 3 16.3V8.7C3 7.5799 3 7.01984 3.21799 6.59202C3.40973 6.21569 3.71569 5.90973 4.09202 5.71799C4.51984 5.5 5.0799 5.5 6.2 5.5H17.8C18.9201 5.5 19.4802 5.5 19.908 5.71799C20.2843 5.90973 20.5903 6.21569 20.782 6.59202C21 7.01984 21 7.5799 21 8.7V12.5M3 9.5H21M18 21.5V15.5M21 18.5008L15 18.5"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
