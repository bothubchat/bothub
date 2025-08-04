import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const QueueIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.colors.grayScale.gray2 } = {
            fill: theme.colors.grayScale.gray2,
          },
        ) => (
          <>
            <g clipPath="url(#clip0_7796_186510)">
              <path
                d="M8.6856 9.14264V13.2569H4.57132V15.3141H8.6856V19.4284H10.7427V15.3141H14.857V13.2569H10.7427V9.14264H8.6856Z"
                fill={fill}
              />
              <path
                d="M0.457031 5.02835V23.5426H18.9713V5.02835H0.457031ZM2.51417 7.08549H16.9142V21.4855H2.51417V7.08549Z"
                fill={fill}
              />
              <path
                d="M4.57132 0.914062V2.97121H21.0285V19.4283H23.0856V0.914062H4.57132Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_7796_186510">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
