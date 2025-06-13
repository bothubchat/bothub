import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const PlayButtonIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={36}
      viewBox="0 0 36 36"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          {
            fill = theme.colors.accent.primary,
            stroke = theme.colors.base.white
          } = {
            fill: theme.colors.accent.primary,
            stroke: theme.colors.base.white
          }
        ) => (
          <>
            <rect
              width="36"
              height="36"
              rx="18"
              fill={fill}
            />
            <g clipPath="url(#clip0_13_40130)">
              <path
                d="M13.401 26.4724C13.6206 26.4724 13.834 26.4357 14.0411 26.3622C14.2544 26.2949 14.4929 26.1878 14.7565 26.0409L26.0521 19.65C26.4851 19.4052 26.8083 19.1573 27.0217 18.9063C27.2413 18.6553 27.3511 18.3523 27.3511 17.9972C27.3511 17.6422 27.2413 17.3392 27.0217 17.0882C26.8083 16.8372 26.4851 16.5893 26.0521 16.3444L14.7565 9.95363C14.4929 9.80672 14.2544 9.69959 14.0411 9.63225C13.834 9.56492 13.6206 9.53125 13.401 9.53125C12.9617 9.53125 12.5852 9.68735 12.2714 9.99954C11.9577 10.3056 11.8008 10.7341 11.8008 11.2851V24.7094C11.8008 25.2604 11.9577 25.6919 12.2714 26.0041C12.5852 26.3163 12.9617 26.4724 13.401 26.4724Z"
                fill={stroke}
              />
            </g>
            <defs>
              <clipPath id="clip0_13_40130">
                <rect
                  width="19.0588"
                  height="16.9412"
                  fill="white"
                  transform="translate(8.4707 9.53125)"
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
