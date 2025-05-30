import { Icon, icon, IconConsumer } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const PauseButtonIcon = icon(({ ...props }) => {
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
            <g clipPath="url(#clip0_13_40131)">
              <path
                d="M15.5 11C15.721 11 15.933 11.0819 16.0893 11.2278C16.2455 11.3737 16.3333 11.5715 16.3333 11.7778V24.2222C16.3333 24.4285 16.2455 24.6263 16.0893 24.7722C15.933 24.9181 15.721 25 15.5 25H13.8333C13.6123 25 13.4004 24.9181 13.2441 24.7722C13.0878 24.6263 13 24.4285 13 24.2222V11.7778C13 11.5715 13.0878 11.3737 13.2441 11.2278C13.4004 11.0819 13.6123 11 13.8333 11H15.5ZM22.1667 11C22.3877 11 22.5996 11.0819 22.7559 11.2278C22.9122 11.3737 23 11.5715 23 11.7778V24.2222C23 24.4285 22.9122 24.6263 22.7559 24.7722C22.5996 24.9181 22.3877 25 22.1667 25H20.5C20.279 25 20.067 24.9181 19.9107 24.7722C19.7545 24.6263 19.6667 24.4285 19.6667 24.2222V11.7778C19.6667 11.5715 19.7545 11.3737 19.9107 11.2278C20.067 11.0819 20.279 11 20.5 11H22.1667Z"
                fill={stroke}
              />
            </g>
            <defs>
              <clipPath id="clip0_13_40131">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(10 10)"
                />
              </clipPath>
            </defs>
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
