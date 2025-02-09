import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TempChatIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path
          d="M2.25 14.0034C2.25 14.8027 2.25 15.2022 2.41385 15.4075C2.55634 15.586 2.77233 15.6898 3.00073 15.6896L6.84192 13.5H13.3527M2.25 5.40015L2.25 11.1027M4.65015 3H13.3501M15.75 5.39768V11.1027"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </IconConsumer>
  </Icon>
));
