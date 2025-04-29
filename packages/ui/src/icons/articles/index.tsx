import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const ArticlesIcon = icon(({ ...props }) => {
  const theme = useTheme();
  const fillColor = theme.colors.base.white;
  return (
    <Icon
      size={24}
      viewBox="0 0 18 19"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ fill = fillColor } = { fill: fillColor }) => (
          <>
            <path
              d="M5.25 14H7.875H10.5"
              stroke={fill}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 11H5.625H6"
              stroke={fill}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 8H6.375H7.5"
              stroke={fill}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 2H12.375L15.75 5.375V14.75"
              stroke={fill}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.25 15.875V5.375C2.25 4.75368 2.75368 4.25 3.375 4.25H10.6886C10.8079 4.25 10.9224 4.29741 11.0068 4.3818L13.3682 6.74319C13.4526 6.82759 13.5 6.94205 13.5 7.0614V15.875C13.5 16.4963 12.9963 17 12.375 17H3.375C2.75368 17 2.25 16.4963 2.25 15.875Z"
              stroke={fill}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 6.8V4.51516C10.5 4.36872 10.6187 4.25 10.7652 4.25C10.8355 4.25 10.9029 4.27794 10.9527 4.32766L13.4223 6.79734C13.4721 6.84706 13.5 6.91451 13.5 6.98484C13.5 7.13128 13.3813 7.25 13.2348 7.25H10.95C10.7015 7.25 10.5 7.04853 10.5 6.8Z"
              fill={fill}
              stroke={fill}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
