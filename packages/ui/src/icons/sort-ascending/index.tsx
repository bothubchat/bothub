import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const SortAscendingIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5721 2.4664C12.8018 2.38984 13.0547 2.46884 13.2 2.66254L15.45 5.66254C15.6364 5.91106 15.5861 6.26364 15.3375 6.45004C15.089 6.63643 14.7364 6.58606 14.55 6.33754L13.3125 4.68754V15C13.3125 15.3107 13.0607 15.5625 12.75 15.5625C12.4394 15.5625 12.1875 15.3107 12.1875 15V3.00004C12.1875 2.75792 12.3425 2.54296 12.5721 2.4664ZM9.75 6.56254H3V5.43754H9.75V6.56254ZM9.75 10.3125H4.5V9.1875H9.75V10.3125ZM9.75 14.0625H6V12.9375H9.75V14.0625Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
