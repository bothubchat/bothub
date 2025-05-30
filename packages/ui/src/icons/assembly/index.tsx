import { Icon, icon } from '@/ui/components/icon';

export const AssemblyIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 25"
    fill="none"
    {...props}
  >
    <rect
      y="0.5"
      width="24"
      height="24"
      rx="12"
      fill="white"
    />
    <g clipPath="url(#clip0_10632_363440)">
      <path
        d="M11.0633 5.5C10.567 5.49993 10.0822 5.64978 9.67254 5.92994C9.26284 6.21009 8.94733 6.60746 8.76733 7.07L4 19.34H7.62133L11.374 9.68267H11.3753C11.4229 9.56405 11.5049 9.46239 11.6108 9.39079C11.7166 9.31918 11.8415 9.28092 11.9693 9.28092C12.0971 9.28092 12.222 9.31918 12.3279 9.39079C12.4338 9.46239 12.5158 9.56405 12.5633 9.68267H13.0633V7.72333H12.1347L12.9987 5.5H11.0633Z"
        fill="#2545D3"
      />
      <path
        d="M8.76739 7.07C8.93985 6.627 9.23681 6.24336 9.62245 5.96537C10.0081 5.68738 10.4659 5.52691 10.9407 5.50333L10.9394 5.5H12.9367C13.9527 5.5 14.8654 6.124 15.2327 7.07L20.0001 19.34H16.3167L11.6934 7.442C11.5596 7.14641 11.3434 6.89572 11.0706 6.72002C10.7979 6.54432 10.4802 6.45108 10.1558 6.45151C9.83132 6.45193 9.5139 6.54599 9.2416 6.7224C8.96931 6.89881 8.75372 7.15007 8.62073 7.446L8.76739 7.07Z"
        fill="#566DE8"
      />
    </g>
    <defs>
      <clipPath id="clip0_10632_363440">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(4 4.5)"
        />
      </clipPath>
    </defs>
  </Icon>
));
