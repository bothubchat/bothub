import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const UploadIcon = icon(({ ...props }) => (
  <Icon
    size={14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#fff' } = { fill: '#fff' }) => (
        <path
          d="M6.125 10.5V3.36875L3.85 5.64375L2.625 4.375L7 0L11.375 4.375L10.15 5.64375L7.875 3.36875V10.5H6.125ZM1.75 14C1.26875 14 0.856917 13.8288 0.5145 13.4864C0.172083 13.144 0.000583333 12.7318 0 12.25V9.625H1.75V12.25H12.25V9.625H14V12.25C14 12.7312 13.8288 13.1434 13.4864 13.4864C13.144 13.8294 12.7318 14.0006 12.25 14H1.75Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
