import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const SearchPlusIcon = icon(({ ...props }) => (
  <Icon size={24} viewBox="0 0 24 25" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <path d="M9 2.5C10.8565 2.5 12.637 3.2375 13.9497 4.55025C15.2625 5.86301 16 7.64348 16 9.5C16 11.07 15.5 12.5 14.61 13.69L15.41 14.5H16L22 20.5L20 22.5L14 16.5V15.91L13.19 15.11C11.9827 16.0186 10.511 16.5068 9 16.5C7.14348 16.5 5.36301 15.7625 4.05025 14.4497C2.7375 13.137 2 11.3565 2 9.5C2 7.64348 2.7375 5.86301 4.05025 4.55025C5.36301 3.2375 7.14348 2.5 9 2.5ZM8 5.5V8.5H5V10.5H8V13.5H10V10.5H13V8.5H10V5.5H8Z" fill={fill} />
      )}
    </IconConsumer>
  </Icon>
));
