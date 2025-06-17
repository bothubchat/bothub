import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const SidebarToggleLeft = icon(({ ...props }) => (
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
            d="M21.9698 15V9C21.9698 4 19.9698 2 14.9698 2H8.96973C3.96973 2 1.96973 4 1.96973 9V15C1.96973 20 3.96973 22 8.96973 22H14.9698C19.9698 22 21.9698 20 21.9698 15Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.96973 2V22"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.9702 9.44141L12.4102 12.0014L14.9702 14.5614"
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
