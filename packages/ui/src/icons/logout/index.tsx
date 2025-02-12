import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const LogoutIcon = icon(({ ...props }) => (
  <Icon
    width={18}
    height={19}
    viewBox="0 0 18 19"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path
          d="M2.77778 17.5C2.28889 17.5 1.87022 17.3258 1.52178 16.9773C1.17333 16.6289 0.999409 16.2105 1 15.7222V3.27778C1 2.78889 1.17422 2.37022 1.52267 2.02178C1.87111 1.67333 2.28948 1.49941 2.77778 1.5H9V3.27778H2.77778V15.7222H9V17.5H2.77778ZM12.5556 13.9444L11.3333 12.6556L13.6 10.3889H6.33333V8.61111H13.6L11.3333 6.34445L12.5556 5.05556L17 9.5L12.5556 13.9444Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
