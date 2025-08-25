import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const CheckSmallIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path
          d="M16.0183 3.70454C16.4106 4.14392 16.4106 4.85748 16.0183 5.29687L7.98344 14.2955C7.59111 14.7348 6.95398 14.7348 6.56165 14.2955L2.54424 9.79616C2.15192 9.35678 2.15192 8.64322 2.54424 8.20384C2.93657 7.76445 3.5737 7.76445 3.96603 8.20384L7.27411 11.9052L14.5996 3.70454C14.9919 3.26515 15.6291 3.26515 16.0214 3.70454H16.0183Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
