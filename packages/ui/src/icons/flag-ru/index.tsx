import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const FlagRUIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {() => (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 10H16V14H0V10Z"
            fill="#F93939"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2H16V6H0V2Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 6H16V10H0V6Z"
            fill="#0066FF"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
