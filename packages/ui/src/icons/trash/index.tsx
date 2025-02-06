import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TrashIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#616D8D' } = { fill: '#616D8D' }) => (
        <path
          d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25M4.5 14.25C4.5 14.6478 4.65804 15.0294 4.93934 15.3107C5.22064 15.592 5.60218 15.75 6 15.75H12C12.3978 15.75 12.7794 15.592 13.0607 15.3107C13.342 15.0294 13.5 14.6478 13.5 14.25V5.25H4.5V14.25Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));
