import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const TelegramFilledIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={20}
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.colors.base.white } = { fill: theme.colors.base.white }
        ) => (
          <>
            <g clipPath="url(#clip0_548_1140)">
              <rect
                width="15"
                height="10.8333"
                transform="translate(3.25 5)"
                fill={fill}
              />
              <path
                d="M10.75 0C5.23 0 0.75 4.48 0.75 10C0.75 15.52 5.23 20 10.75 20C16.27 20 20.75 15.52 20.75 10C20.75 4.48 16.27 0 10.75 0ZM15.39 6.8C15.24 8.38 14.59 12.22 14.26 13.99C14.12 14.74 13.84 14.99 13.58 15.02C13 15.07 12.56 14.64 12 14.27C11.12 13.69 10.62 13.33 9.77 12.77C8.78 12.12 9.42 11.76 9.99 11.18C10.14 11.03 12.7 8.7 12.75 8.49C12.7569 8.45819 12.756 8.42517 12.7473 8.3938C12.7386 8.36244 12.7224 8.33367 12.7 8.31C12.64 8.26 12.56 8.28 12.49 8.29C12.4 8.31 11 9.24 8.27 11.08C7.87 11.35 7.51 11.49 7.19 11.48C6.83 11.47 6.15 11.28 5.64 11.11C5.01 10.91 4.52 10.8 4.56 10.45C4.58 10.27 4.83 10.09 5.3 9.9C8.22 8.63 10.16 7.79 11.13 7.39C13.91 6.23 14.48 6.03 14.86 6.03C14.94 6.03 15.13 6.05 15.25 6.15C15.35 6.23 15.38 6.34 15.39 6.42C15.38 6.48 15.4 6.66 15.39 6.8Z"
                fill="#2298D2"
              />
            </g>
            <defs>
              <clipPath id="clip0_548_1140">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.75)"
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
