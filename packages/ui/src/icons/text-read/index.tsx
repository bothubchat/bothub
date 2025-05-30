import { Icon, icon, IconConsumer } from '@/ui/components/icon';

export const TextReadIcon = icon(({ ...props }) => (
  <Icon
    size={30}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill, stroke } = { fill: '#073CA4', stroke: '#4785FF' }) => (
        <>
          <rect
            width="30"
            height="20"
            rx="4"
            fill={fill}
          />
          <path
            d="M22.6634 14L21.9498 11.8338H18.9935L18.3026 14H17L19.6958 6H21.3042L24 14H22.6634ZM20.5 7.19198H20.4434L19.2994 10.7221H21.6327L20.5 7.19198Z"
            fill={stroke}
          />
          <path
            d="M14.3536 10.3536C14.5488 10.1583 14.5488 9.84171 14.3536 9.64645L11.1716 6.46447C10.9763 6.2692 10.6597 6.2692 10.4645 6.46447C10.2692 6.65973 10.2692 6.97631 10.4645 7.17157L13.2929 10L10.4645 12.8284C10.2692 13.0237 10.2692 13.3403 10.4645 13.5355C10.6597 13.7308 10.9763 13.7308 11.1716 13.5355L14.3536 10.3536ZM6 10.5L14 10.5L14 9.5L6 9.5L6 10.5Z"
            fill={stroke}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
