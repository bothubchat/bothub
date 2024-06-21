import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const EditIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <path d="M5.43225 13.497H2.25V10.3155L10.8263 1.73924C10.9669 1.59864 11.1576 1.51965 11.3565 1.51965C11.5554 1.51965 11.7461 1.59864 11.8868 1.73924L14.0085 3.86024C14.1491 4.00089 14.2281 4.19162 14.2281 4.39049C14.2281 4.58937 14.1491 4.7801 14.0085 4.92074L5.43225 13.497ZM2.25 14.997H15.75V16.497H2.25V14.997Z" fill={fill} />
      )}
    </IconConsumer>
  </Icon>
));
