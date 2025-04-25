import { Icon, icon } from '@/ui/components/icon';

export const MaxWindowIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M6.75 15.75H2.25V11.25"
      fill="#616D8D"
    />
    <path
      d="M2.25 15.75L7.125 10.875L2.25 15.75Z"
      fill="#616D8D"
    />
    <path
      d="M11.25 2.25H15.75V6.75"
      fill="#616D8D"
    />
    <path
      d="M10.875 7.125L15.75 2.25L10.875 7.125Z"
      fill="#616D8D"
    />
    <path
      d="M6.75 15.75H2.25M2.25 15.75V11.25M2.25 15.75L7.125 10.875M11.25 2.25H15.75M15.75 2.25V6.75M15.75 2.25L10.875 7.125"
      stroke="#616D8D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
));
