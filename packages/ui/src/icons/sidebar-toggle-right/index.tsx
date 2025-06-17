import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const SidebarToggleRight = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ stroke = '#616D8D' } = { stroke: '#616D8D' }) => (
        <>
          <path
            d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.97 2V22"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.96997 9.44141L10.53 12.0014L7.96997 14.5614"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));
