import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const UpscaleIcon = icon(({ ...props }) => (
  <Icon
    size={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <path
          d="M2 2H6V3.33333H4.308L7.53667 6.562L6.59333 7.50467L3.33333 4.24467V6H2V2ZM2 14H6V12.6667H4.25067L7.53667 9.38133L6.59333 8.43867L3.33333 11.6987V10H2V14ZM10 14H14V10H12.6667V11.6827L9.422 8.43867L8.47933 9.38133L11.7647 12.6667H10V14ZM14 2H10V3.33333H11.708L8.47933 6.562L9.422 7.50467L12.6667 4.26V6H14V2Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
