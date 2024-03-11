import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const GenerationIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <>
          <path d="M14.5714 9L11.1429 12.5H13.4286C13.4286 13.1428 12.9154 14 12.2857 14H5.42857C4.79886 14 4 13.1428 4 12.5V11.3333H2V12.5C2 14.4303 3.53771 16 5.42857 16H12.2857C14.1766 16 15.7143 14.4303 15.7143 12.5H18L14.5714 9Z" fill={fill} />
          <path d="M12.5714 2H5.71429C3.82343 2 2.28571 3.56975 2.28571 5.5V5.53617H0L3.42857 9L6.85714 5.53617H4.57143V5.5C4.57143 4.85717 5.08457 4 5.71429 4H12.5C13.1297 4 14 4.85717 14 5.5V6.66667H16V5.5C16 3.56975 14.4623 2 12.5714 2Z" fill={fill} />
        </>
      )}
    </IconConsumer>
  </Icon>
));
