import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const StopIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <>
          <g clipPath="url(#clip0_570_16991)">
            <path d="M5.8 1L1 5.9248V12.2L5.8 17H12.2L17 12.2V5.9248L12.2 1H5.8Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.2 9H5.79999" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <defs>
            <clipPath id="clip0_570_16991">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));
