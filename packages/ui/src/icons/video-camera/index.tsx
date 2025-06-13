import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const VideoCameraIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      size={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.colors.base.white } = { fill: theme.colors.base.white }
        ) => (
          <>
            <path
              d="M15 7C15 5.89543 14.1046 5 13 5H2C0.89543 5 0 5.89543 0 7V18C0 19.1046 0.895431 20 2 20H13C14.1046 20 15 19.1046 15 18V7Z"
              fill={fill}
            />
            <path
              d="M22.9142 5C22.649 5 22.3946 5.10536 22.2071 5.29289L18.2929 9.20711C18.1054 9.39464 18 9.649 18 9.91421V15.0858C18 15.351 18.1054 15.6054 18.2929 15.7929L22.2071 19.7071C22.3946 19.8946 22.649 20 22.9142 20H23C23.5523 20 24 19.5523 24 19V6C24 5.44772 23.5523 5 23 5H22.9142Z"
              fill={fill}
            />
          </>
        )}
      </IconConsumer>
    </Icon>
  );
});
