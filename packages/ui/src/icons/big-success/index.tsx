import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const BigSuccessIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <rect
            width="24"
            height="24"
            rx="4"
            fill="#313E62"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM16.0001 9.79572C16.0001 9.67274 15.9518 9.55479 15.8658 9.46782C15.7798 9.38088 15.6631 9.33203 15.5415 9.33203C15.4199 9.33203 15.3032 9.38088 15.2172 9.46782L11.1839 13.5459L9.4441 11.7867C9.35759 11.7023 9.24172 11.6555 9.12145 11.6566C9.00119 11.6576 8.88614 11.7064 8.8011 11.7924C8.71605 11.8784 8.66781 11.9947 8.66677 12.1163C8.66572 12.2379 8.71195 12.3551 8.79551 12.4425L10.8596 14.5296C10.9456 14.6165 11.0623 14.6654 11.1839 14.6654C11.3055 14.6654 11.4222 14.6165 11.5082 14.5296L15.8658 10.1236C15.9518 10.0366 16.0001 9.9187 16.0001 9.79572Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
