import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const ArrowNarrowUpIcon = icon(({ ...props }) => (
  <Icon
    size={20}
    viewBox="0 0 20 21"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.29315 8.35018C5.10545 8.17437 5 7.93596 5 7.68736C5 7.43877 5.10545 7.20035 5.29315 7.02454L9.29816 3.27449C9.48592 3.09873 9.74055 3 10.006 3C10.2715 3 10.5262 3.09873 10.7139 3.27449L14.7189 7.02454C14.9013 7.20136 15.0022 7.43818 15 7.68399C14.9977 7.9298 14.8924 8.16494 14.7067 8.33876C14.5211 8.51259 14.27 8.61118 14.0074 8.61332C13.7449 8.61546 13.492 8.52096 13.3032 8.35018L11.0073 6.20047L11.0073 17.0625C11.0073 17.3111 10.9018 17.5496 10.714 17.7254C10.5263 17.9012 10.2716 18 10.006 18C9.7405 18 9.48582 17.9012 9.29805 17.7254C9.11028 17.5496 9.00479 17.3111 9.00479 17.0625L9.00479 6.20047L6.70892 8.35018C6.52116 8.52594 6.26653 8.62467 6.00104 8.62467C5.73554 8.62467 5.48092 8.52594 5.29315 8.35018Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
