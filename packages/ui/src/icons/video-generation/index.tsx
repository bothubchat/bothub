import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const VideoGenerationIcon = icon(({ ...props }) => {
  const theme = useTheme();

  const fillColor = theme.colors.base.white;

  return (
    <Icon
      size={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {({ fill = fillColor } = { fill: fillColor }) => (
          <>
            <g clipPath="url(#clip0_12265_143280)">
              <path
                d="M18.666 1.33325L19.5708 3.62726C19.6543 3.83903 19.696 3.94491 19.76 4.03418C19.8166 4.11332 19.8859 4.18261 19.9651 4.23929C20.0544 4.30323 20.1602 4.34499 20.372 4.42851L22.666 5.33325L20.372 6.23801C20.1602 6.32152 20.0544 6.36325 19.9651 6.42721C19.8859 6.48387 19.8166 6.55316 19.76 6.63232C19.696 6.72161 19.6543 6.82747 19.5708 7.03925L18.666 9.33325L17.7613 7.03925C17.6778 6.82747 17.636 6.72161 17.5721 6.63232C17.5154 6.55316 17.4461 6.48387 17.3669 6.42721C17.2777 6.36325 17.1718 6.32152 16.96 6.23801L14.666 5.33325L16.96 4.42851C17.1718 4.34499 17.2777 4.30323 17.3669 4.23929C17.4461 4.18261 17.5154 4.11332 17.5721 4.03418C17.636 3.94491 17.6778 3.83903 17.7613 3.62726L18.666 1.33325Z"
                fill={fill}
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 13C10 11.8954 9.10457 11 8 11H2C0.89543 11 0 11.8954 0 13V19C0 20.1046 0.895431 21 2 21H8C9.10457 21 10 20.1046 10 19V13Z"
                fill={fill}
              />
              <path
                d="M15.2929 11C15.1054 11 14.9255 11.0745 14.7929 11.2071L12.2929 13.7071C12.1054 13.8946 12 14.149 12 14.4142V17.5858C12 17.851 12.1054 18.1054 12.2929 18.2929L14.7929 20.7929C14.9255 20.9255 15.1054 21 15.2929 21C15.6834 21 16 20.6834 16 20.2929V11.7071C16 11.3166 15.6834 11 15.2929 11Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_12265_143280">
                <rect
                  width="24"
                  height="24"
                  fill={fill}
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
