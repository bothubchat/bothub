import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const CopyVariantsIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <path
          d="M14.25 1.5C15.0785 1.5 15.75 2.17157 15.75 3V12C15.75 12.8284 15.0785 13.5 14.25 13.5H12.75V15C12.75 15.8284 12.0785 16.5 11.25 16.5H3.75C2.92157 16.5 2.25 15.8284 2.25 15V6C2.25 5.17157 2.92157 4.5 3.75 4.5H5.25V3C5.25 2.17157 5.92157 1.5 6.75 1.5H14.25ZM7.5 11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.3846 5.53953 12.7016 5.91253 12.745L6 12.75H7.5C7.91423 12.75 8.25 12.4142 8.25 12C8.25 11.6154 7.96048 11.2984 7.58747 11.255L7.5 11.25ZM14.25 3H6.75V4.5H11.25C12.0785 4.5 12.75 5.17157 12.75 6V12H14.25V3ZM9 8.25H6C5.58579 8.25 5.25 8.58577 5.25 9C5.25 9.41422 5.58579 9.75 6 9.75H9C9.41423 9.75 9.75 9.41422 9.75 9C9.75 8.58577 9.41423 8.25 9 8.25Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));